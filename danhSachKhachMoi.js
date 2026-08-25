/* ================================================
   DANH SÁCH KHÁCH MỜI
   - ten:  tên hiển thị trên bìa thiệp
   - link: slug trên URL, ví dụ link "gia-dinh-hien"
     → https://phamvanchuong.github.io/dam-cuoi/gia-dinh-hien
   Chỉ dùng chữ thường không dấu, số và dấu gạch ngang cho link.
================================================ */
const danhSachKhachMoi = [
  {
    id: 1,
    ten: "Bạn Quỳnh",
    link: "ban-quynh"
  },
  {
    id: 2,
    ten: "Bạn Linh",
    link: "ban-linh"
  },
  {
    id: 3,
    ten: "Bạn Mẫn",
    link: "ban-man"
  },
  {
    id: 4,
    ten: "Vợ chồng 2 bạn Nguyên Kiều",
    link: "vo-chong-2-ban-nguyen-kieu"
  },
  {
    id: 5,
    ten: "Bạn Yến",
    link: "ban-yen"
  },
  {
    id: 6,
    ten: "Bạn Thảo Vân",
    link: "ban-thao-van"
  },
  {
    id: 7,
    ten: "Bạn Kiều",
    link: "ban-kieu"
  },
  {
    id: 8,
    ten: "Vợ chồng 2 bạn Thanh Sơn",
    link: "vo-chong-2-ban-thanh-son"
  },
  {
    id: 9,
    ten: "Bạn Thảo",
    link: "ban-thao"
  },
  {
    id: 10,
    ten: "Bạn Công Sơn",
    link: "ban-cong-son"
  },
  {
    id: 11,
    ten: "Bạn Trân",
    link: "ban-tran"
  },
  {
    id: 12,
    ten: "Bạn Trinh",
    link: "ban-trinh"
  },
  {
    id: 13,
    ten: "Bạn Đức",
    link: "ban-duc"
  },
  {
    id: 14,
    ten: "Bạn Hưởng",
    link: "ban-huong"
  },
  {
    id: 15,
    ten: "Bạn Hoàng",
    link: "ban-hoang"
  },
  {
    id: 16,
    ten: "Bạn Duyên",
    link: "ban-duyen"
  },
  {
    id: 17,
    ten: "Bạn Siu Uyên",
    link: "ban-siu-uyen"
  },
  {
    id: 18,
    ten: "Bạn Khanh",
    link: "ban-khanh"
  },
  {
    id: 19,
    ten: "Bạn Huy",
    link: "ban-huy"
  },
  {
    id: 20,
    ten: "Bạn Quý",
    link: "ban-quy"
  },
  {
    id: 21,
    ten: "Bạn Kỳ Anh",
    link: "ban-ky-anh"
  },
  {
    id: 22,
    ten: "Bạn Hạnh",
    link: "ban-hanh"
  },
  {
    id: 23,
    ten: "Bạn Hạnh",
    link: "ban-hanh"
  },
  {
    id: 24,
    ten: "Bạn Như",
    link: "ban-nhu"
  },
  {
    id: 25,
    ten: "Bạn Hồng",
    link: "ban-hong"
  },
  {
    id: 26,
    ten: "Bạn Kiều Vy",
    link: "ban-kieu-vy"
  },
  {
    id: 27,
    ten: "Bạn Hương Thảo",
    link: "ban-huong-thao"
  },
  {
    id: 28,
    ten: "Chị Trâm",
    link: "chi-tram"
  },
  {
    id: 29,
    ten: "Em Ngân + người thương",
    link: "em-ngan-va-nguoi-thuong"
  },
  {
    id: 30,
    ten: "Bạn Thuý",
    link: "ban-thuy"
  },
  {
    id: 31,
    ten: "Bạn Tâm",
    link: "ban-tam"
  },
  {
    id: 32,
    ten: "Anh Chị Dương Linh",
    link: "anh-chi-duong-linh"
  },
  {
    id: 33,
    ten: "Bạn Phương Uyên",
    link: "ban-phuong-uyen"
  },
  {
    id: 34,
    ten: "Bạn Ly iu và Em Sa",
    link: "ban-ly-iu-va-em-sa"
  },
  {
    id: 35,
    ten: "O Dung",
    link: "o-dung"
  },
  {
    id: 36,
    ten: "Vợ chồng O Dung",
    link: "vo-chong-o-dung"
  },
  {
    id: 37,
    ten: "Anh Huy",
    link: "anh-huy"
  },
  {
    id: 38,
    ten: "Vợ chồng anh Huy",
    link: "vo-chong-anh-huy"
  },
  {
    id: 39,
    ten: "Ba mẹ",
    link: "ba-me"
  },
  {
    id: 40,
    ten: "Ba",
    link: "ba"
  },
  {
    id: 41,
    ten: "Mẹ",
    link: "me"
  },
  {
    id: 42,
    ten: "Em Vy",
    link: "em-vy"
  },
  {
    id: 43,
    ten: "Em Thuỳ Dung",
    link: "em-thuy-dung"
  },
  {
    id: 44,
    ten: "Em Dũng",
    link: "em-dung"
  },
  {
    id: 45,
    ten: "Em Dương",
    link: "em-duong"
  },
  {
    id: 46,
    ten: "Bạn Văn",
    link: "ban-van"
  },



  // ============== Chu re

  {
    id: 101,
    ten: "Bạn Quốc + người thương",
    link: "ban-quoc-va-nguoi-thuong"
  },

  {
    id: 102,
    ten: "Vợ chồng bạn Phát",
    link: "vo-chong-ban-phat"
  },
  {
    id: 103,
    ten: "Bạn Nghĩa + người thương",
    link: "ban-nghia-va-nguoi-thuong"
  },
  {
    id: 104,
    ten: "Bạn Trường + người thương",
    link: "ban-truong-va-nguoi-thuong"
  },
  {
    id: 105,
    ten: "Bạn Đoàn + người thương",
    link: "ban-doan-va-nguoi-thuong"
  },
  {
    id: 106,
    ten: "Vợ chồng chị Hường",
    link: "vo-chong-chi-huong"
  },
  {
    id: 107,
    ten: "Vợ chồng bạn Hương",
    link: "vo-chong-ban-huong"
  },
  {
    id: 108,
    ten: "Vợ chồng bạn Thuỳ Linh",
    link: "vo-chong-ban-thuy-linh"
  },
  {
    id: 109,
    ten: "Bạn Mỹ Linh + người thương",
    link: "ban-my-linh-va-nguoi-thuong"
  },
  {
    id: 110,
    ten: "Bạn Tuyết Linh + người thương",
    link: "ban-tuyet-linh-va-nguoi-thuong"
  },
  {
    id: 111,
    ten: "Bạn Phượng + người thương",
    link: "ban-phuong-va-nguoi-thuong"
  },
  {
    id: 112,
    ten: "Vợ chồng Nhi",
    link: "vo-chong-nhi"
  },
  {
    id: 113,
    ten: "Vợ chồng chị Tuyền",
    link: "vo-chong-chi-tuyen"
  },
  {
    id: 114,
    ten: "Bạn Chí",
    link: "ban-chi"
  },
  {
    id: 115,
    ten: "Bạn Thảo + người thương",
    link: "ban-thao-va-nguoi-thuong"
  },
  {
    id: 116,
    ten: "Vợ chồng bạn Duyên",
    link: "vo-chong-ban-duyen"
  },
  {
    id: 117,
    ten: "Bạn Nguyệt + người thương",
    link: "ban-nguyet-va-nguoi-thuong"
  },
  {
    id: 118,
    ten: "Bạn Huyền + người thương",
    link: "ban-huyen-va-nguoi-thuong"
  },
  {
    id: 119,
    ten: "Vợ chồng bạn Giang",
    link: "vo-chong-ban-giang"
  },
  {
    id: 120,
    ten: "Bạn Trường + người thương",
    link: "ban-truong-va-nguoi-thuong"
  },
  {
    id: 121,
    ten: "Vợ chồng bạn Tiên",
    link: "vo-chong-ban-tien"
  },
  {
    id: 122,
    ten: "Bạn Tâm + người thương",
    link: "ban-tam-va-nguoi-thuong"
  },
  {
    id: 123,
    ten: "Bạn Thành + người thương",
    link: "ban-thanh-va-nguoi-thuong"
  },
  {
    id: 124,
    ten: "Em Hiền + người thương",
    link: "em-hien-va-nguoi-thuong"
  },
  {
    id: 125,
    ten: "Bạn Thiện + người thương",
    link: "ban-thien-va-nguoi-thuong"
  },
  {
    id: 126,
    ten: "Vợ chồng bạn Ngân",
    link: "vo-chong-ban-ngan"
  },
  {
    id: 127,
    ten: "Bạn Kiệt + người thương",
    link: "ban-kiet-va-nguoi-thuong"
  },
  {
    id: 128,
    ten: "Vợ chồng anh Tuấn",
    link: "vo-chong-anh-tuan"
  },
  {
    id: 129,
    ten: "Bạn Minh + người thương",
    link: "ban-minh-va-nguoi-thuong"
  },
  {
    id: 130,
    ten: "Bạn Kiệt + người thương",
    link: "ban-kiet-va-nguoi-thuong"
  },
  {
    id: 131,
    ten: "Vợ chồng anh Chương",
    link: "vo-chong-anh-chuong"
  },
  {
    id: 132,
    ten: "Anh Vương + người thương",
    link: "anh-vuong-va-nguoi-thuong"
  },
  {
    id: 133,
    ten: "Bạn Hà",
    link: "ban-ha"
  },
  {
    id: 134,
    ten: "Bạn Trân Hà",
    link: "ban-tran-ha"
  },
  {
    id: 135,
    ten: "Bạn Hương Lan + người thương",
    link: "ban-huong-lan-va-nguoi-thuong"
  },
  {
    id: 136,
    ten: "Bạn Vân + người thương",
    link: "ban-van-va-nguoi-thuong"
  },
  {
    id: 137,
    ten: "Vợ chồng bạn Đức",
    link: "vo-chong-ban-duc"
  },
  {
    id: 138,
    ten: "Vợ chồng bạn Trường",
    link: "vo-chong-ban-truong"
  },
  {
    id: 139,
    ten: "Vợ chồng bạn Vy",
    link: "vo-chong-ban-vy"
  },
  {
    id: 140,
    ten: "Bạn Tuấn + người thương",
    link: "ban-tuan-va-nguoi-thuong"
  },
  {
    id: 141,
    ten: "Bạn Mã Năm + người thương",
    link: "ban-ma-nam-va-nguoi-thuong"
  },
  {
    id: 141,
    ten: "Bạn Vũ Hà + người thương",
    link: "ban-vu-ha-va-nguoi-thuong"
  },
  {
    id: 142,
    ten: "Vợ chồng bạn Quỳnh Anh",
    link: "vo-chong-ban-quynh-anh"
  },
  {
    id: 143,
    ten: "Bạn Hiến + người thương",
    link: "ban-hien-va-nguoi-thuong"
  },
  {
    id: 144,
    ten: "Vợ chồng bạn Tâm",
    link: "vo-chong-ban-tam"
  },
  {
    id: 145,
    ten: "Vợ chồng bạn Tâm",
    link: "vo-chong-ban-tam"
  },
  {
    id: 146,
    ten: "Vợ chồng bạn Nguyên",
    link: "vo-chong-ban-nguyen"
  },
  {
    id: 147,
    ten: "Vợ chồng em Trang",
    link: "vo-chong-em-trang"
  },
  {
    id: 148,
    ten: "Em Trang",
    link: "em-trang"
  },
  {
    id: 149,
    ten: "Bạn Thảo Vy",
    link: "ban-thao-vy"
  },
  {
    id: 150,
    ten: "Bạn Quỳnh Ly + người thương",
    link: "ban-quynh-ly-va-nguoi-thuong"
  },
  {
    id: 151,
    ten: "Vợ chồng bạn Quỳnh Ly",
    link: "vo-chong-ban-quynh-ly"
  },
  {
    id: 152,
    ten: "Bạn Mẫn + người thương",
    link: "ban-man-va-nguoi-thuong"
  },
  {
    id: 153,
    ten: "Vợ chồng chị Tuyết",
    link: "vo-chong-chi-tuyet"
  },
  {
    id: 154,
    ten: "Chị Phượng + người thương",
    link: "chi-phuong-va-nguoi-thuong"
  },
  {
    id: 155,
    ten: "Anh Tài",
    link: "anh-tai"
  },
  {
    id: 156,
    ten: "Cô Dung",
    link: "co-dung"
  },
  {
    id: 157,
    ten: "Vợ chồng chị Thảo",
    link: "vo-chong-chi-thao"
  },
  {
    id: 158,
    ten: "Bạn Nhị Thống + người thương",
    link: "ban-nhi-thong-va-nguoi-thuong"
  },
];
