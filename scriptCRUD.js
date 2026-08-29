let _id = undefined;
const listElement = document.getElementById("list");
const listImage = document.getElementById("listImage");

const reloadButton = document.getElementById("reloadButton");
let selectedImageBase64 = null;
let updateButton = null;




function openTab(tabId, button) {
  // Ẩn tất cả nội dung
  document.querySelectorAll(".tab-content").forEach(tab => {
    tab.classList.remove("active");
  });

  // Bỏ active tất cả button
  document.querySelectorAll(".tab-button").forEach(btn => {
    btn.classList.remove("active");
  });

  // Hiển thị tab được chọn
  document.getElementById(tabId).classList.add("active");

  // Active button được chọn
  button.classList.add("active");
}

// ========================================
// TẢI DANH SÁCH
// ========================================

async function loadMessages() {
  try {
    listElement.innerHTML = "Đang tải...";

    const response = await fetch("/api/data");

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Không thể tải dữ liệu");
    }

    const data = result.data || [];

    // ------------------------------
    // Không có dữ liệu
    // ------------------------------

    if (data.length === 0) {
      listElement.innerHTML = `
                <div class="empty">
                Hãy là người đầu tiên gửi lời chúc! 💌
                </div>
            `;

      return;
    }

    listElement.innerHTML = "";

    // ------------------------------
    // Hiển thị từng lời chúc
    // ------------------------------

    data.forEach(item => {
      const element = document.createElement("div");

      element.className = "item";

      // =========================
      // NAME
      // =========================

      const name = document.createElement("div");

      name.className = "name";

      name.textContent = item.name;

      // =========================
      // MESSAGE
      // =========================

      const message = document.createElement("div");

      message.className = "message";

      message.textContent = item.message;

      // =========================
      // DATE
      // =========================

      const date = document.createElement("div");

      date.className = "date";

      if (item.createdAt) {
        date.textContent = new Date(item.createdAt).toLocaleString("vi-VN");
      }

      // =========================
      // DELETE
      // =========================

      const deleteButton = document.createElement("button");

      deleteButton.className = "delete-button";

      deleteButton.textContent = "Xóa";

      deleteButton.addEventListener("click", () => {
        deleteMessage(item.id);
      });

      // =========================
      // APPEND
      // =========================

      element.appendChild(name);

      element.appendChild(message);

      element.appendChild(date);

      element.appendChild(deleteButton);

      listElement.appendChild(element);
    });
  } catch (error) {
    console.error("LOAD ERROR:", error);

    listElement.innerHTML = "";

    const errorElement = document.createElement("div");

    errorElement.className = "empty";

    errorElement.textContent = "Lỗi: " + error.message;

    listElement.appendChild(errorElement);
  }
}

// ========================================
// XÓA
// ========================================

async function deleteMessage(id) {
  const confirmed = confirm("Bạn có chắc muốn xóa lời chúc này?");

  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch("/api/data", {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        id: id
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Không thể xóa");
    }

    alert("Xóa thành công!");

    // Tải lại

    await loadMessages();
  } catch (error) {
    console.error("DELETE ERROR:", error);

    alert("Lỗi: " + error.message);
  }
}

reloadButton.addEventListener("click", loadMessages);


function changeImage(album) {
  console.log(album?.id)
  _id = album?.id;
  updateButton = album.querySelector(".update-button");
  // 1. Tìm thẻ <img> bên trong album
  const img = album.querySelector("img");

  // 2. Tạo một thẻ <input type="file"> bằng JavaScript
  const input = document.createElement("input");

  // 3. Cho phép input này chọn file
  input.type = "file";

  // 4. Chỉ cho phép chọn hình ảnh
  input.accept = "image/*";

  // 5. Xử lý khi người dùng chọn một file
  input.onchange = function (event) {
    // 6. Lấy file đầu tiên mà người dùng chọn
    const file = event.target.files[0];

    // 7. Nếu người dùng không chọn file thì dừng
    if (!file) return;

    // ==============================
    // KIỂM TRA DUNG LƯỢNG ẢNH
    // ==============================

    const maxSize = 5 * 1024 * 1024; // 5 MB

    if (file.size > maxSize) {
      alert("Ảnh không được lớn hơn 5 MB!");
      return;
    }

    // 8. Kiểm tra file có phải hình ảnh hay không
    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn một file hình ảnh!");

      return;
    }

    // =====================================================
    // PHẦN 1: HIỂN THỊ ẢNH NGAY LẬP TỨC
    // =====================================================

    // 9. Tạo một URL tạm thời từ file
    const imageURL = URL.createObjectURL(file);

    // 10. Thay đổi src của thẻ <img>
    // Ảnh sẽ hiển thị ngay lập tức
    img.src = imageURL;

    // 11. Khi ảnh đã được hiển thị
    img.onload = function () {
      // 12. Xóa URL tạm thời khỏi bộ nhớ
      URL.revokeObjectURL(imageURL);
    };

    // =====================================================
    // PHẦN 2: CHUYỂN ẢNH SANG BASE64
    // =====================================================

    // 13. Tạo FileReader
    const reader = new FileReader();

    // 14. Xử lý khi FileReader đọc file xong
    reader.onload = function (e) {
      // 15. Lấy dữ liệu Base64
      const base64 = e.target.result;

      // 17. Ví dụ lưu Base64 vào album
      album.dataset.base64 = base64;
      updateButton.style.display = "block";

      // 18. Bạn cũng có thể sử dụng biến base64
      // để gửi lên API / Database
      //   console.log("Có thể lưu DB:", album.dataset.base64);
    };

    // 19. Bắt đầu đọc file dưới dạng Base64
    reader.readAsDataURL(file);
  };

  // 20. Mở cửa sổ chọn file
  input.click();
}
async function createImage(event,album,stt) {
  event.stopPropagation();
  updateButton.style.display = "none";

  if (_id === undefined || _id === 'undefined') {
  
    const base64 = album.dataset.base64;

    if (!base64) {
      alert("Không có ảnh mới để cập nhật!");

      return;
    }

    const response = await fetch("/api/data", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        type: "image",
        image: base64,
        stt:stt
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    } else {

      const notification = document.getElementById("notification");
      notification.style.display = "block";
      // Chờ 2s để Sheets kịp ghi rồi reload
      setTimeout(() => {

        notification.style.display = "none";

      }, 4000);
    }
  } else {
    updateImageAPI(album);
  }


}

async function loadImages() {

  try {

    const response =
      await fetch(
        "/api/data?type=images"
      );


    const result =
      await response.json();


    if (!response.ok) {

      throw new Error(
        result.message ||
        "Không thể tải ảnh"
      );

    }
    createListImage(result?.data);
    return result?.data;


  } catch (error) {

    console.error(
      "LOAD IMAGES ERROR:",
      error
    );

    return [];

  }
}

// ========================================
// TẢI DANH SÁCH IMAGE
// ========================================

function createListImage(e) {
  for (let index = 1; index < 9; index++) {
    const item = e[index];

    const elementDiv = document.createElement("div");
    elementDiv.className = "album-item";
    elementDiv.id = item?.id

    const imgDiv = document.createElement("img");
    imgDiv.src = item?.image || '/images/noImage.png'

    const albumDiv = document.createElement("div");
    albumDiv.className = "album-placeholder";

    const albumNote = document.createElement("div");
    albumNote.className = "album-note";

    const btnCapNhat = document.createElement("button");
    btnCapNhat.className = "update-button";
    btnCapNhat.innerHTML = "Cập nhật";

    elementDiv.appendChild(imgDiv);
    albumDiv.appendChild(albumNote);
    elementDiv.appendChild(albumDiv)
    elementDiv.appendChild(btnCapNhat)
    // ===== Lay index anh
    albumNote.innerHTML = "Ảnh " +index;

    // Them chuc nang click vao anh
    imgDiv.addEventListener("click", (event) => {
      event.stopPropagation();
      changeImage(elementDiv);
    });

    // Them chuc nang click vao button
    btnCapNhat.addEventListener("click", (event) => {
      createImage(event, elementDiv,index);
    });
    listImage.appendChild(elementDiv);

  }
}


async function updateImageAPI(album) {
  // --------------------------------
  // Lấy ID ảnh hiện tại
  // --------------------------------

  const id = _id;


  // --------------------------------
  // Lấy Base64 ảnh mới
  // --------------------------------

  const base64 =
    album.dataset.base64;
  // Kiểm tra ID
  if (!id) {

    alert(
      "Không tìm thấy ID ảnh!"
    );

    return;

  }


  // Kiểm tra Base64
  if (!base64) {

    alert(
      "Không có ảnh mới để cập nhật!"
    );

    return;

  }


  try {

    const response =
      await fetch(
        "/api/data",
        {

          method: "PUT",

          headers: {

            "Content-Type":
              "application/json"

          },

          body:
            JSON.stringify({

              type:
                "image",

              id:
                id,

              image:
                base64

            })

        }
      );


    const result =
      await response.json();


    if (!response.ok) {

      throw new Error(
        result.message ||
        "Không thể cập nhật ảnh"
      );

    }

    const notification = document.getElementById("notification");
    notification.style.display = "block";
    // Chờ 2s để Sheets kịp ghi rồi reload
    setTimeout(() => {

      notification.style.display = "none";

    }, 4000);

    // Xóa Base64 tạm
    delete album.dataset.base64;


  } catch (error) {

    console.error(
      "UPDATE IMAGE ERROR:",
      error
    );


    alert(
      "Lỗi: " +
      error.message
    );

  }

}
loadImages()