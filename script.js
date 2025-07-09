// ================== DANH SÁCH TRUYỆN ==================
const defaultComics = [
  {
    title: "One Piece",
    genre: "Hành động",
    status: "Đang cập nhật",
    image: "image/one_piece_106_bia_gap.webp",
    chapter: "Chap 1115",
    chapters: [
      {
        name: "Chap 1114",
        images: ["image/onepiece_1114_1.jpg", "image/onepiece_1114_2.jpg"]
      },
      {
        name: "Chap 1115",
        images: ["image/onepiece_1115_1.jpg", "image/onepiece_1115_2.jpg"]
      }
    ]
  },
  {
    title: "Doraemon",
    genre: "Hài hước",
    status: "Hoàn thành",
    image: "image/Doraemon.jpg",
    chapter: "Tập cuối",
    chapters: []
  },
  {
    title: "Tokyo Ghoul",
    genre: "Kinh dị",
    status: "Hoàn thành",
    image: "image/tokyo_ghoul.jpg",
    chapter: "Tập 14",
    chapters: []
  },
  {
    title: "Detective Conan",
    genre: "Trinh thám",
    status: "Đang cập nhật",
    image: "image/conan.jpg",
    chapter: "Chap 1120",
    chapters: []
  },
  {
    title: "Attack on Titan",
    genre: "Hành động",
    status: "Hoàn thành",
    image: "image/titan.jpg",
    chapter: "Chap 139",
    chapters: []
  },
  {
    title: "Naruto",
    genre: "Hành động",
    status: "Hoàn thành",
    image: "image/naruto.jpg",
    chapter: "Tập cuối",
    chapters: []
  },
  {
    title: "Jujutsu Kaisen",
    genre: "Hành động",
    status: "Đang cập nhật",
    image: "image/Jujutsu_kaisen.jpg",
    chapter: "Chap 270",
    chapters: []
  },
  {
    title: "Black Clover",
    genre: "Hành động",
    status: "Đang cập nhật",
    image: "image/Black_Clover.jpg",
    chapter: "Chap 370",
    chapters: []
  },
  {
    title: "Death Note",
    genre: "Kinh dị",
    status: "Hoàn thành",
    image: "image/death_note.jpg",
    chapter: "Tập cuối",
    chapters: []
  },
  {
    title: "Chainsaw Man",
    genre: "Hành động",
    status: "Đang cập nhật",
    image: "image/Chainsawman.jpg",
    chapter: "Chap 168",
    chapters: []
  }
];

// ================== GIAO DIỆN CHÍNH ==================
const comicList = document.getElementById("comicList");
const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");
const statusFilter = document.getElementById("statusFilter");

function renderComics(list) {
  if (!comicList) return;
  comicList.innerHTML = "";
  list.forEach((comic) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${comic.image}" alt="${comic.title}" />
      <div class="info">
        <h3>${comic.title}</h3>
        <p>${comic.chapter}</p>
      </div>
    `;
    card.addEventListener("click", () => {
      localStorage.setItem("selectedComic", JSON.stringify(comic));
      window.location.href = "detail.html";
    });
    comicList.appendChild(card);
  });
}

function filterComics(list) {
  const searchTerm = searchInput?.value.toLowerCase() || "";
  const selectedGenre = genreFilter?.value || "";
  const selectedStatus = statusFilter?.value || "";

  return list.filter((comic) => {
    return (
      comic.title.toLowerCase().includes(searchTerm) &&
      (selectedGenre === "" || comic.genre === selectedGenre) &&
      (selectedStatus === "" || comic.status === selectedStatus)
    );
  });
}

// ================== ĐĂNG KÝ ==================
function register() {
  const username = document.getElementById("registerUsername").value;
  const password = document.getElementById("registerPassword").value;
  const message = document.getElementById("registerMessage");

  if (!username || !password) {
    message.textContent = "Vui lòng nhập đầy đủ thông tin!";
    return;
  }

  if (localStorage.getItem(username)) {
    message.textContent = "Tên người dùng đã tồn tại!";
    return;
  }

  localStorage.setItem(username, password);
  message.style.color = "green";
  message.textContent = "Đăng ký thành công! Chuyển hướng...";
  setTimeout(() => {
    window.location.href = "login.html";
  }, 2000);
}

// ================== ĐĂNG NHẬP ==================
function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  const message = document.getElementById("loginMessage");

  const storedPassword = localStorage.getItem(username);

  if (!storedPassword) {
    message.textContent = "Tài khoản không tồn tại!";
  } else if (password !== storedPassword) {
    message.textContent = "Mật khẩu không đúng!";
  } else {
    localStorage.setItem("currentUser", username);
    message.style.color = "green";
    message.textContent = "Đăng nhập thành công!";
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  }
}

// ================== GIAO DIỆN NGƯỜI DÙNG ==================
function updateUserUI() {
  const userActions = document.getElementById("userActions");
  const currentUser = localStorage.getItem("currentUser");

  if (userActions) {
    if (currentUser) {
      userActions.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 6px;">
          <span>👋 Xin chào, <strong>${currentUser}</strong></span>
          <button onclick="logout()">Đăng xuất</button>
          <button onclick="window.location.href='admin_login.html'" style="background: #e67e22;">Quản trị</button>
        </div>
      `;
    } else {
      userActions.innerHTML = `
        <button onclick="window.location.href='login.html'">Đăng nhập</button>
        <button onclick="window.location.href='register.html'">Đăng ký</button>
      `;
    }
  }
}


function logout() {
  localStorage.removeItem("currentUser");
  updateUserUI();
  location.reload();
}

// ================== CHI TIẾT: ĐỌC TRUYỆN ==================
function readComic() {
  window.location.href = "reader.html";
}

// ================== KHỞI CHẠY ==================
document.addEventListener("DOMContentLoaded", () => {
  updateUserUI();
  if (comicList) {
    const storedComics = JSON.parse(localStorage.getItem("comics") || "[]");
    const allComics = [...defaultComics, ...storedComics];
    renderComics(allComics);

    searchInput?.addEventListener("input", () => renderComics(filterComics(allComics)));
    genreFilter?.addEventListener("change", () => renderComics(filterComics(allComics)));
    statusFilter?.addEventListener("change", () => renderComics(filterComics(allComics)));
  }
});
