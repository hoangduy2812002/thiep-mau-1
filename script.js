/* ================================================
   THIỆP CƯỚI – Script.js
   Văn Chương & Hồng Thư – 25/07/2026
================================================ */

// ── TÊN KHÁCH MỜI TỪ URL ────────────────────────
// URL dạng https://.../dam-cuoi/anh-viet → slug "anh-viet"
// Tra trong danhSachKhachMoi (danhSachKhachMoi.js) để hiện tên lên bìa.
let checkNgayGio = false;
function initGuestName() {
  // deleteEntry(4);
  if (typeof danhSachKhachMoi === "undefined") return;

  const segments = window.location.search.split("?").filter(Boolean);

  let checkDR;
  if (segments?.length > 0) {
    checkDR = segments[0][1];
  }


  if (checkDR?.toLowerCase() === "d" || checkDR?.toLocaleLowerCase() === "D") {
    document.getElementById("ngayCuoi").innerHTML = "19/09/2026";
    document.getElementById("diaChiXa").innerHTML = "Tổ 10 - Thôn Đức Hạnh";
    document.getElementById("diaChiThanhPho").innerHTML = "Xã Hoài Đức - T. Lâm Đồng";
    document.getElementById("myIframe").src = "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3914.5894640863276!2d107.50056!3d11.143922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDA4JzM4LjEiTiAxMDfCsDMwJzAyLjAiRQ!5e0!3m2!1svi!2s!4v1787296528578!5m2!1svi!2s";
    checkNgayGio = true;
    document.getElementById("checkTenLe").innerHTML = "VU QUY";

    doiViTri();

  } else {
    document.getElementById("myIframe").src = "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3915.9630930859425!2d107.287165!3d11.041394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDAyJzI5LjAiTiAxMDfCsDE3JzEzLjgiRQ!5e0!3m2!1svi!2s!4v1787295714607!5m2!1svi!2";

  }

  const slug = decodeURIComponent(
    segments[segments.length - 1]?.split("/").slice(2).join("/") || ""
  )
    .replace(/\.html$/i, "")
    .toLowerCase();

  const tenNguoiMoi = slug?.split('&')[0]


  if (!slug) return;

  // const guest = danhSachKhachMoi.find(k => k.link.toLowerCase() === slug);
  const guest = danhSachKhachMoi.find(k => k.link.toLowerCase() === tenNguoiMoi);


  if (!guest) return;

  // document.title = `Hoàng Duy & Anh Thư - Kính mời ${guest.ten}`;

  // Điền tên khách mời ở cả bìa thiệp và phần thông tin nhà hàng
  ["coverGuestName", "venueGuestName",].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = guest.ten;
  });

  document.getElementById("gbName").value = guest?.ten;
}

function doiViTri() {
  const orn_thiep = document.getElementById("orn_thiep");
  [...orn_thiep.children].reverse().forEach(el => orn_thiep.appendChild(el));
  // =====
  const orn_thiep_trong = document.getElementById("orn_thiep_trong");
  [...orn_thiep_trong.children].reverse().forEach(el => orn_thiep_trong.appendChild(el));
  // =====
  const orn_thiep_bame = document.getElementById("orn_thiep_bame");
  [...orn_thiep_bame.children].reverse().forEach(el => orn_thiep_bame.appendChild(el));

  const orn_ten_vo_chong = document.getElementById("orn_ten_vo_chong");
  [...orn_ten_vo_chong.children].reverse().forEach(el => orn_ten_vo_chong.appendChild(el));
  // 
  const orn_footer_ten_vo_chong = document.getElementById("orn_footer_ten_vo_chong");
  [...orn_footer_ten_vo_chong.children].reverse().forEach(el => orn_footer_ten_vo_chong.appendChild(el));

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
  if (checkNgayGio) {
    document.getElementById("gioCuoi").innerHTML = "THỨ BẢY";
    document.getElementById("ngayCuoiDau").innerHTML = "19";
    document.getElementById("ngayCuoiCoDau").innerHTML = "09";
  }

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
function openInvitation() {
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
    loadGuestBook();
    playMusic(); // Tự phát nhạc sau khi mở thiệp
  }, 800);
}

// ── ĐẾM NGƯỢC ────────────────────────────────
// Ngày cưới: 25/07/2026 lúc 12:00 Giờ VN (UTC+7) = 05:00 UTC
let WEDDING_DATE = new Date("2026-09-20T11:00:00+07:00");

function startCountdown() {
  try {
    function tick() {
      if (checkNgayGio) {
        WEDDING_DATE = new Date("2026-09-19T11:00:00+07:00");
      }
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
  } catch (error) {
    console.log((error))
  }
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

// ── SỔ LƯU BÚT (Google Sheets) ─────────────────────────────────────
/*
  HƯỚNG DẪN CÀI ĐẶT GOOGLE SHEETS:
  1. Mở https://script.google.com → tạo project mới
  2. Dán đoạn code sau vào editor và lưu:
  ──────────────────────────────────────────────────────────────────
  function doPost(e) {
    var data  = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([new Date().toLocaleString('vi-VN'), data.name, data.message]);
    return ContentService
      .createTextOutput(JSON.stringify({status:'ok'}))
      .setMimeType(ContentService.MimeType.JSON);
  }
  function doGet() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rows  = sheet.getDataRange().getValues().slice(1).reverse();
    var data  = rows.map(function(r){return{date:r[0],name:r[1],message:r[2]};});
    return ContentService
      .createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);
  }
  ──────────────────────────────────────────────────────────────────
  3. Deploy → New deployment → Web app
     - Execute as: Me
     - Who has access: Anyone
  4. Copy URL dán vào APPS_SCRIPT_URL bên dưới
*/

// ↓ Dán URL Google Apps Script vào đây:
const APPS_SCRIPT_URL =
  // "https://script.google.com/macros/s/AKfycbzSotbHLC2NpI4mrVpoKswHrXBM8cnO3jjD3Ldkx_Y0nVyvwZehSOoWJ-mt-bvYBnKI/exec";
  // "https://script.google.com/macros/s/AKfycbw17FwDK_uuh9LhH73fdzISVM3M8OrgUeYizt7jRjZV8Qs0EYQugwZSfCx1rIze9j1z/exec"
  // "https://script.google.com/macros/s/AKfycbz1_DCV96dR5ODfyQNDKJZU2MKxUgJCT7Kud8ExI1KFFzLysN8Jr-32amaNr6oGh2ZU/exec"
  // "https://script.google.com/macros/s/AKfycbyoS8XKwRs4UbTYwWRrMOWsG_M2ifpxAFrDMD5RHwvx8KnNJXPV8wCq-OCoLlLIGFe9/exec";
"https://script.google.com/macros/s/AKfycbwUj79NtXaCB3MTwkTVwpReHbldiWY0rw2QHP5NyPvLXJejltX7doxq3om_KnZgiL4A/exec";


function loadGuestBook() {
  const list = document.getElementById("gbList");
  if (!list) return;

  if (APPS_SCRIPT_URL === "YOUR_APPS_SCRIPT_URL") {
    list.innerHTML =
      '<p class="gb-empty">⚙️ Chưa cấu hình Google Sheets. Xem hướng dẫn trong script.js</p>';
    return;
  }

  list.innerHTML = '<p class="gb-loading">⏳ Đang tải lời chúc...</p>';

  fetch(APPS_SCRIPT_URL)
    .then(r => r.json())
    .then(entries => {
      list.innerHTML = "";
      if (!entries.length) {
        list.innerHTML =
          '<p class="gb-empty">Hãy là người đầu tiên gửi lời chúc! 💌</p>';
        return;
      }
      entries.reverse().forEach(e => list.appendChild(buildEntry(e)));
    })
    .catch(() => {
      list.innerHTML =
        '<p class="gb-empty">⚠️ Không thể tải lời chúc. Vui lòng thử lại sau.</p>';
    });
}

function saveEntry(name, message) {
  // mode: no-cors → tránh CORS preflight, request vẫn được gửi thành công
  return fetch(APPS_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ name: name.trim(), message: message.trim() })
  });
}


function buildEntry(entry) {

  const div = document.createElement("div");
  div.className = "gb-entry";
  div.innerHTML = `
        <div class="gb-avatar">${safe(entry.name).charAt(0).toUpperCase()}</div>
        <div class="gb-body">
            <div class="gb-entry-name">${safe(entry.name)}</div>
            <div class="gb-entry-msg">${safe(entry.message)}</div>
        </div>
        `;
  return div;
}

// Chống XSS
function safe(str) {
  const d = document.createElement("div");
  d.appendChild(document.createTextNode(str));
  return d.innerHTML;
}

// Khởi động khi load: tên khách mời + hiệu ứng trái tim
document.addEventListener("DOMContentLoaded", () => {
  initGuestName();
  initFallingHearts();
});

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

    if (APPS_SCRIPT_URL === "YOUR_APPS_SCRIPT_URL") {
      alert("⚙️ Vui lòng cấu hình APPS_SCRIPT_URL trong script.js trước!");
      return;
    }

    const btn = gbForm.querySelector(".gb-btn");
    btn.disabled = true;
    btn.textContent = "⏳ Đang gửi...";

    saveEntry(name, message)
      .then(() => {
        gbForm.reset();
        document.getElementById("gbName").focus();
        // Chờ 1.5s để Sheets kịp ghi rồi reload
        setTimeout(loadGuestBook, 1500);
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



