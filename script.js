const totalNumberImage = CONFIG.totalNumberImage;
const listImageHome = document.getElementById("listImageHome");


/* ================================================
   THIỆP CƯỚI – Script.js
================================================ */
// Khởi động khi load: tên khách mời + hiệu ứng trái tim
document.addEventListener("DOMContentLoaded", () => {
  getName();
  initGuestName();
  initFallingHearts();
});
// ── TÊN KHÁCH MỜI TỪ URL ────────────────────────
// URL dạng https://.../dam-cuoi/anh-viet → slug "anh-viet"
async function initGuestName() {
  const url = window.location.pathname.substring(1);

  const name = decodeURIComponent(url);
  const slug = name.trim();

  const checkGuest = await loadCheckNickName();

  const guest = checkGuest.find(k => k.nickName.toLowerCase() === slug);
  if (!guest) return;


  // Điền tên khách mời ở cả bìa thiệp và phần thông tin nhà hàng
  ["coverGuestName", "venueGuestName"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = guest.name;
  });
}

// ── TRÁI TIM RƠI ────────────────────────────────
const HEART_CHARS = ["♥", "♥", "♥", "♡", "❤"]; // tỉ lệ ♥ nhiều hơn
const HEART_COLORS = [
  "rgba(255, 120, 120, VAL)", // hồng đỏ
  "rgba(255, 160, 160, VAL)", // hồng nhạt
  "rgba(220,  80,  80, VAL)", // đỏ
  "rgba(201, 162,  39, VAL)", // vàng
  "rgba(240, 200,  80, VAL)" // vàng nhạt
];

let heartInterval = null;

function initFallingHearts() {
  const container = document.getElementById("coverHearts");
  if (!container) return;

  // Tạo loạt đầu tiên ngay lập tức
  for (let i = 0; i < 18; i++) {
    setTimeout(() => spawnHeart(container), i * 200);
  }

  // Tiếp tục sinh trái tim đều đặn
  heartInterval = setInterval(() => spawnHeart(container), 450);
}

function spawnHeart(container) {
  const el = document.createElement("span");
  el.className = "falling-heart";
  el.textContent = HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)];

  const size = (Math.random() * 26 + 10).toFixed(1); // 10–36 px
  const leftPct = (Math.random() * 98).toFixed(1); // 0–98%
  const duration = (Math.random() * 5 + 5).toFixed(2); // 5–10 s
  const delay = (Math.random() * 1.5).toFixed(2); // 0–1.5 s
  const swing = ((Math.random() - 0.5) * 60).toFixed(1) + "px"; // lắc ngang
  const swingEnd = ((Math.random() - 0.5) * 80).toFixed(1) + "px";
  const rotMid = ((Math.random() - 0.5) * 40).toFixed(1) + "deg";
  const rotEnd = ((Math.random() - 0.5) * 60).toFixed(1) + "deg";
  const opacity = (Math.random() * 0.45 + 0.25).toFixed(2);
  const colorTpl =
    HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)];
  const color = colorTpl.replace("VAL", opacity);

  el.style.cssText = [
    `left: ${leftPct}%`,
    `font-size: ${size}px`,
    `color: ${color}`,
    `animation-duration: ${duration}s`,
    `animation-delay: ${delay}s`,
    `--swing: ${swing}`,
    `--swing-end: ${swingEnd}`,
    `--rot-mid: ${rotMid}`,
    `--rot-end: ${rotEnd}`
  ].join(";");

  container.appendChild(el);

  // Xoá khỏi DOM sau khi animation kết thúc
  const totalMs = (parseFloat(duration) + parseFloat(delay)) * 1000 + 200;
  setTimeout(() => el.remove(), totalMs);
}

// Dừng tạo trái tim khi đóng bìa
function stopFallingHearts() {
  if (heartInterval) {
    clearInterval(heartInterval);
    heartInterval = null;
  }
}

// ── NHẠC NỀN ─────────────────────────────────
function playMusic() {
  const audio = document.getElementById("bgMusic");
  const btn = document.getElementById("musicBtn");
  if (!audio) return;
  audio
    .play()
    .then(() => {
      if (btn) {
        btn.classList.add("playing");
        btn.title = "Tắt nhạc";
      }
    })
    .catch(() => { }); // Trình duyệt có thể chặn – người dùng bấm nút để bật
}

function toggleMusic() {
  const audio = document.getElementById("bgMusic");
  const btn = document.getElementById("musicBtn");
  if (!audio) return;

  if (audio.paused) {
    audio
      .play()
      .then(() => {
        btn.textContent = "🎵";
        btn.title = "Tắt nhạc";
        btn.classList.add("playing");
        btn.classList.remove("muted");
      })
      .catch(() => { });
  } else {
    audio.pause();
    btn.textContent = "🔇";
    btn.title = "Bật nhạc";
    btn.classList.remove("playing");
    btn.classList.add("muted");
  }
}

// ── MỞ THIỆP ──────────────────────────────────
async function openInvitation() {
  const cover = document.getElementById("cover");
  const main = document.getElementById("main");

  stopFallingHearts();
  cover.classList.add("closing");

  setTimeout(() => {
    cover.style.display = "none";
    main.classList.remove("hidden");

    window.scrollTo({ top: 0, behavior: "instant" });

    startCountdown();
    initScrollAnimations();
    playMusic(); // Tự phát nhạc sau khi mở thiệp
  }, 800);

  await loadMessages();
}

// ── ĐẾM NGƯỢC ────────────────────────────────
// Ngày cưới: 25/07/2026 lúc 12:00 Giờ VN (UTC+7) = 05:00 UTC
const WEDDING_DATE = new Date(CONFIG.ngayThangNamDienRaTiecCuoi);

function startCountdown() {
  function tick() {
    const now = new Date();
    const diff = WEDDING_DATE - now;

    const pad = n => String(Math.max(0, n)).padStart(2, "0");

    if (diff <= 0) {
      ["cdDays", "cdHours", "cdMinutes", "cdSeconds"].forEach(id => {
        document.getElementById(id).textContent = "00";
      });
      clearInterval(timer);
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor(diff % 86400000 / 3600000);
    const minutes = Math.floor(diff % 3600000 / 60000);
    const seconds = Math.floor(diff % 60000 / 1000);

    document.getElementById("cdDays").textContent = pad(days);
    document.getElementById("cdHours").textContent = pad(hours);
    document.getElementById("cdMinutes").textContent = pad(minutes);
    document.getElementById("cdSeconds").textContent = pad(seconds);
  }

  tick();
  const timer = setInterval(tick, 1000);
}

// ── HIỆU ỨNG CUỘN ────────────────────────────
function initScrollAnimations() {
  const els = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12 }
  );

  els.forEach(el => observer.observe(el));

  // Hiển thị ngay những phần tử đã trong viewport
  requestAnimationFrame(() => {
    els.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add("visible");
      }
    });
  });
}

// ── SỔ LƯU BÚT ─────────────────────────────────────

async function loadMessages() {
  const list = document.getElementById("gbList");
  if (!list) return;

  list.innerHTML = '<p class="gb-loading">⏳ Đang tải lời chúc...</p>';

  const response = await fetch("/api/data");
  try {
    const result = await response.json();
    list.innerHTML = "";
    result?.data?.forEach(e => list.appendChild(buildEntry(e)));

    const btn = gbForm.querySelector(".gb-btn");

    if (result?.data?.length > CONFIG.limit_loiChuc) {
      btn.disabled = true;
    }

  } catch (error) {
    list.innerHTML =
      '<p class="gb-empty">⚠️ Không thể tải lời chúc. Vui lòng thử lại sau.</p>';
  }
}

// ========================================
// LƯU
// ========================================

async function saveEntry(name, message) {
  try {

    // =================================
    // THÊM
    // =================================
    const response = await fetch("/api/data", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        name: name,

        message: message
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Không thể thêm");
    } else {
      await loadMessages();
    }


  } catch (error) {
    console.error("SAVE ERROR:", error);

    showStatus("Lỗi: " + error.message);
  } finally {
  }
}

function buildEntry(entry) {
  const div = document.createElement("div");
  div.className = "gb-entry";
  div.innerHTML = `
      <div class="gb-avatar">${safe(entry.name).charAt(0).toUpperCase()}</div>
      <div class="gb-body">
          <div class="gb-entry-name">${safe(entry.name)}</div>
          <div class="gb-entry-msg">${safe(entry.message)}</div>
      </div>`;
  return div;
}

// Chống XSS
function safe(str) {
  const d = document.createElement("div");
  d.appendChild(document.createTextNode(str));
  return d.innerHTML;
}

// Gắn sự kiện form
const gbForm = document.getElementById("gbForm");
if (gbForm) {
  gbForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("gbName").value.trim();
    const message = document.getElementById("gbMessage").value.trim();
    if (!name || !message) return;
    if (name.length > 100 || message.length > 500) {
      alert("Tên tối đa 100 ký tự, lời chúc tối đa 500 ký tự.");
      return;
    }
    const btn = gbForm.querySelector(".gb-btn");
    btn.disabled = true;
    btn.textContent = "⏳ Đang gửi...";

    saveEntry(name, message)
      .then(() => {
        gbForm.reset();
        document.getElementById("gbName").focus();
      })
      .catch(() => alert("Không thể gửi lời chúc. Vui lòng thử lại!"))
      .finally(() => {
        btn.disabled = false;
        btn.textContent = "🪄 GỬi LỜI CHÚC";
      });
  });
}

// ── HỘP MỪNG CƯỚI ────────────────────────────
function toggleGift() {
  const envelope = document.getElementById("giftEnvelope");
  const content = document.getElementById("giftContent");
  const isHidden =
    content.style.display === "none" || content.style.display === "";

  if (isHidden) {
    envelope.style.display = "none";
    content.style.display = "block";

    // Kiểm tra ảnh QR
    const qrImg = content.querySelector(".qr-img");
    const qrNote = document.getElementById("qrNote");
    if (qrImg && qrNote) {
      if (!qrImg.complete || qrImg.naturalWidth === 0) {
        qrImg.style.display = "none";
        qrNote.style.display = "flex";
      }
    }
  } else {
    content.style.display = "none";
    envelope.style.display = "block";
  }
}

// ── LIGHTBOX ẢNH ─────────────────────────────
function openLightbox(item) {
  const img = item.querySelector("img");
  if (!img || img.style.display === "none" || !img.src) return;

  document.getElementById("lightboxImg").src = img.src;
  document.getElementById("lightboxImg").alt = img.alt;
  document.getElementById("lightbox").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("active");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeLightbox();
});

function getName() {
  document.querySelectorAll(".chu-re").forEach(el => {
    el.textContent = CONFIG.chuRe;
  });

  document.querySelectorAll(".co-dau").forEach(el => {
    el.textContent = CONFIG.coDau;
  });
  document.querySelectorAll(".ngay-cuoi").forEach(el => {
    el.textContent = CONFIG.ngayCuoi;
  });

  document.querySelectorAll(".ba-chu-re").forEach(el => {
    el.textContent = CONFIG.baChuRe;
  });

  document.querySelectorAll(".me-chu-re").forEach(el => {
    el.textContent = CONFIG.meChuRe;
  });

  document.querySelectorAll(".ba-co-dau").forEach(el => {
    el.textContent = CONFIG.baCoDau;
  });

  document.querySelectorAll(".me-co-dau").forEach(el => {
    el.textContent = CONFIG.meCodau;
  });

  document.querySelectorAll(".dia-chi-phuong-chu-re").forEach(el => {
    el.textContent = CONFIG.diaChiPhuongChuRe;
  });

  document.querySelectorAll(".dia-chi-tp-chu-re").forEach(el => {
    el.textContent = CONFIG.diaChiTPChuRe;
  });

  document.querySelectorAll(".dia-chi-phuong-co-dau").forEach(el => {
    el.textContent = CONFIG.diaChiPhuongCoDau;
  });

  document.querySelectorAll(".dia-chi-tp-co-dau").forEach(el => {
    el.textContent = CONFIG.diaChiTPCoDau;
  });

  document.querySelectorAll(".danh-xung-chu-re").forEach(el => {
    el.textContent = CONFIG.danhXungChuRe;
  });

  document.querySelectorAll(".danh-xung-co-dau").forEach(el => {
    el.textContent = CONFIG.danhXungCoDau;
  });

  document.querySelectorAll(".chu-re-full").forEach(el => {
    el.textContent = CONFIG.chuReFull;
  });

  document.querySelectorAll(".co-dau-full").forEach(el => {
    el.textContent = CONFIG.coDauFull;
  });

  document.querySelectorAll(".tiec-cuoi-tai").forEach(el => {
    el.textContent = CONFIG.tiecCuoiTai;
  });

  document.querySelectorAll(".ten-nha-hang").forEach(el => {
    el.textContent = CONFIG.tenNhaHang;
  });

  document.querySelectorAll(".dia-chi-phuong-tiec-cuoi").forEach(el => {
    el.textContent = CONFIG.diaChiPhuongTiecCuoi;
  });

  document.querySelectorAll(".dia-chi-tp-tiec-cuoi").forEach(el => {
    el.textContent = CONFIG.diaChiTpTiecCuoi;
  });

  document.querySelectorAll(".gio-tiec-cuoi-dien-ra").forEach(el => {
    el.textContent = CONFIG.gioTiecCuoiDienRa;
  });

  document.querySelectorAll(".thu-tiec-cuoi-dien-ra").forEach(el => {
    el.textContent = CONFIG.thuTiecCuoiDienRa;
  });

  document.querySelectorAll(".ngay-tiec-cuoi-dien-ra").forEach(el => {
    el.textContent = CONFIG.ngayTiecCuoiDienRa;
  });

  document.querySelectorAll(".thang-tiec-cuoi-dien-ra").forEach(el => {
    el.textContent = CONFIG.thangTiecCuoiDienRa;
  });

  document.querySelectorAll(".nam-tiec-cuoi-dien-ra").forEach(el => {
    el.textContent = CONFIG.namTiecCuoiDienRa;
  });

  document.querySelectorAll(".nham-ngay-tiec-cuoi-dien-ra").forEach(el => {
    el.textContent = CONFIG.nhamNgayTiecCuoiDienRa;
  });

  // co ben dao hay khong
  getGiaoXu();
  //
}

function getGiaoXu() {
  document.querySelectorAll(".thanh-duong-giao-xu").forEach(el => {
    el.textContent = CONFIG.thanhDuongGiaoXu;
  });

  document.querySelectorAll(".gio-le-nha-tho").forEach(el => {
    el.textContent = CONFIG.gioLeNhaTho;
  });

  document.querySelectorAll(".thu-lam-le").forEach(el => {
    el.textContent = CONFIG.thuLamLe;
  });

  document.querySelectorAll(".ngay-lam-le").forEach(el => {
    el.textContent = CONFIG.ngay;
  });

  document.querySelectorAll(".nham-ngay").forEach(el => {
    el.textContent = CONFIG.nhamNgay;
  });
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
    let listData = [];

    for (let stt = 1; stt <= totalNumberImage; stt++) {

      const item = result?.data.find(
        item => Number(item.stt) === stt
      );

      if (item) {

        listData.push(item);

      } else {

        listData.push({
          stt: stt
        });

      }
    }

    createListImage(listData);

    return listData;


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

  e.forEach((item, stt) => {
    const elementDiv = document.createElement("div");
    elementDiv.className = "album-item";
    elementDiv.id = item?.id
    const imgDiv = document.createElement("img");
    imgDiv.src = item?.image || '/images/noImage.png'

    const albumDiv = document.createElement("div");
    albumDiv.className = "album-placeholder";

    // const albumNote = document.createElement("div");
    // albumNote.className = "album-note";

    // const btnCapNhat = document.createElement("button");
    // btnCapNhat.className = "update-button";
    // btnCapNhat.innerHTML = "Cập nhật";

    elementDiv.appendChild(imgDiv);
    // albumDiv.appendChild(albumNote);
    elementDiv.appendChild(albumDiv)
    // elementDiv.appendChild(btnCapNhat)
    // ===== Lay index anh
    // albumNote.innerHTML = "Ảnh " + index;

    // Them chuc nang click vao anh
    imgDiv.addEventListener("click", (event) => {
      event.stopPropagation();
      openLightbox(elementDiv);
    });

    // Them chuc nang click vao button
    // btnCapNhat.addEventListener("click", (event) => {
    //   // createImage(event, elementDiv, Number(index));
    // });
    listImageHome.appendChild(elementDiv);
  });
}


async function loadCheckNickName() {
  try {

    const response =
      await fetch(
        "/api/data?type=nickName"
      );


    const result =
      await response.json();


    if (!response.ok) {

      throw new Error(
        result.message ||
        "Không thể tải"
      );

    }

    const data = result?.data || [];
    // ------------------------------
    // Không có dữ liệu
    // ------------------------------

    // if (data.length === 0) {

    // }
    return data;


  } catch (error) {

    console.error(
      "LOAD NICKNAME ERROR:",
      error
    );

    return [];

  }
}



loadImages()

