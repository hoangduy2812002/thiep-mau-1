import { put, list, get, del } from "@vercel/blob";

// ========================================
// CẤU HÌNH
// ========================================

const DIRECTORY = "messages/";
const IMAGE_DIRECTORY = "images/";

// ========================================
// ĐỌC MỘT BLOB
// ========================================

async function readBlob(pathname) {
  const result = await get(pathname, {
    access: "private"
  });

  if (!result) {
    return null;
  }

  const text = await new Response(result.stream).text();

  return JSON.parse(text);
}

// ========================================
// LẤY DANH SÁCH
// ========================================

async function getMessages() {
  const result = await list({
    prefix: DIRECTORY
  });

  const data = [];

  for (const blob of result.blobs) {
    try {
      const item = await readBlob(blob.pathname);

      if (!item) {
        continue;
      }

      data.push({
        // Đây chính là ID
        // dùng để sửa và xóa
        id: blob.pathname,

        name: item.name,

        message: item.message,

        createdAt: item.createdAt || null
      });
    } catch (error) {
      console.error("READ ERROR:", blob.pathname, error);
    }
  }

  // Mới nhất lên đầu

  data.reverse();

  return data;
}

// ========================================
// THÊM
// ========================================

async function addMessage(name, message) {
  // Tạo tên file duy nhất

  const id = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;

  const pathname = `${DIRECTORY}${id}.json`;

  // Dữ liệu lưu

  const data = {
    name: name.trim(),

    message: message.trim(),

    createdAt: new Date().toISOString()
  };

  // Tạo Blob mới

  const blob = await put(pathname, JSON.stringify(data, null, 4), {
    access: "private",

    contentType: "application/json"
  });

  return {
    id: blob.pathname,

    ...data
  };
}

// ========================================
// SỬA
// ========================================

async function updateMessage(id, name, message) {
  // ------------------------------------
  // Kiểm tra ID
  // ------------------------------------

  if (
    typeof id !== "string" ||
    !id.startsWith(DIRECTORY) ||
    !id.endsWith(".json")
  ) {
    throw new Error("ID không hợp lệ");
  }

  // ------------------------------------
  // Đọc Blob cũ
  // ------------------------------------

  const oldData = await readBlob(id);

  if (!oldData) {
    throw new Error("Không tìm thấy dữ liệu");
  }

  // ------------------------------------
  // Tạo dữ liệu mới
  // ------------------------------------

  const newData = {
    name: name.trim(),

    message: message.trim(),

    // Giữ ngày tạo ban đầu
    createdAt: oldData.createdAt || new Date().toISOString()
  };

  // ------------------------------------
  // Ghi đè Blob cũ
  // ------------------------------------

  await put(id, JSON.stringify(newData, null, 4), {
    access: "private",

    contentType: "application/json",

    allowOverwrite: true
  });

  return {
    id: id,

    ...newData
  };
}

// ========================================
// XÓA
// ========================================

async function deleteMessage(id) {
  // ------------------------------------
  // Kiểm tra ID
  // ------------------------------------

  if (
    typeof id !== "string" ||
    !id.startsWith(DIRECTORY) ||
    !id.endsWith(".json")
  ) {
    throw new Error("ID không hợp lệ");
  }

  // ------------------------------------
  // Xóa Blob
  // ------------------------------------

  await del(id);
}

// ========================================
// THÊM ẢNH
// ========================================

async function addImage(base64) {
  // Kiểm tra Base64

  if (typeof base64 !== "string" || !base64.startsWith("data:image/")) {
    throw new Error("Dữ liệu hình ảnh không hợp lệ");
  }

  // ------------------------------------
  // Tách loại ảnh và dữ liệu Base64
  // ------------------------------------

  const matches = base64.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);

  if (!matches) {
    throw new Error("Base64 hình ảnh không hợp lệ");
  }

  const imageType = matches[1];

  const imageData = matches[2];

  // ------------------------------------
  // Chuyển Base64 thành Buffer
  // ------------------------------------

  const buffer = Buffer.from(imageData, "base64");

  // ------------------------------------
  // Tạo ID duy nhất
  // ------------------------------------

  const id = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;

  // ------------------------------------
  // Xác định đuôi file
  // ------------------------------------

  let extension = imageType;

  if (extension === "jpeg") {
    extension = "jpg";
  }

  // ------------------------------------
  // Đường dẫn lưu ảnh
  // ------------------------------------

  const pathname = `${IMAGE_DIRECTORY}${id}.${extension}`;

  // ------------------------------------
  // Lưu ảnh vào Vercel Blob
  // ------------------------------------

  const blob = await put(pathname, buffer, {
    access: "private",

    contentType: `image/${imageType}`
  });

  // ------------------------------------
  // Trả kết quả
  // ------------------------------------

  return {
    id: blob.pathname,

    url: blob.url,

    type: imageType
  };
}

// ========================================
// API HANDLER
// ========================================

export default async function handler(req, res) {
  try {
    // =================================
    // GET
    // =================================

    if (req.method === "GET") {
      const data = await getMessages();

      return res.status(200).json({
        success: true,

        data: data
      });
    }

    // =================================
    // POST
    // =================================

    if (req.method === "POST") {
      const { type, image } = req.body || {};

      // =================================
      // UPLOAD ẢNH
      // =================================

      if (type === "image") {
        if (typeof image !== "string" || !image.startsWith("data:image/")) {
          return res.status(400).json({
            success: false,

            message: "Ảnh không hợp lệ"
          });
        }

        const data = await addImage(image);

        return res.status(201).json({
          success: true,

          message: "Upload ảnh thành công",

          data: data
        });
      }

      const { name, message } = req.body || {};

      // Kiểm tra tên

      if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
          success: false,

          message: "Tên không được để trống"
        });
      }

      // Kiểm tra lời chúc

      if (typeof message !== "string" || !message.trim()) {
        return res.status(400).json({
          success: false,

          message: "Lời chúc không được để trống"
        });
      }

      const data = await addMessage(name, message);

      return res.status(201).json({
        success: true,

        message: "Thêm thành công",

        data: data
      });
    }

    // =================================
    // PUT
    // =================================

    if (req.method === "PUT") {
      const { id, name, message } = req.body || {};

      // Kiểm tra ID

      if (typeof id !== "string") {
        return res.status(400).json({
          success: false,

          message: "Thiếu ID"
        });
      }

      // Kiểm tra tên

      if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
          success: false,

          message: "Tên không được để trống"
        });
      }

      // Kiểm tra lời chúc

      if (typeof message !== "string" || !message.trim()) {
        return res.status(400).json({
          success: false,

          message: "Lời chúc không được để trống"
        });
      }

      const data = await updateMessage(id, name, message);

      return res.status(200).json({
        success: true,

        message: "Sửa thành công",

        data: data
      });
    }

    // =================================
    // DELETE
    // =================================

    if (req.method === "DELETE") {
      const { id } = req.body || {};

      if (typeof id !== "string") {
        return res.status(400).json({
          success: false,

          message: "Thiếu ID"
        });
      }

      await deleteMessage(id);

      return res.status(200).json({
        success: true,

        message: "Xóa thành công"
      });
    }

    // =================================
    // METHOD KHÔNG HỖ TRỢ
    // =================================

    return res.status(405).json({
      success: false,

      message: "Method không được hỗ trợ"
    });
  } catch (error) {
    console.error("API ERROR:", error);

    return res.status(500).json({
      success: false,

      message: error.message
    });
  }
}
