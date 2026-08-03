// Konfigurasi Utama Firebase Proyek Si DESKA WPS
const firebaseConfig = {
  apiKey: "AIzaSyAHGLNVtubgL41YZuZL3I4QwqUR6NBNfqQ",
  authDomain: "si-deska-wps.firebaseapp.com",
  databaseURL: "https://si-deska-wps-default-rtdb.firebaseio.com",
  projectId: "si-deska-wps",
  storageBucket: "si-deska-wps.appspot.com",
  messagingSenderId: "595163960871",
  appId: "1:595163960871:web:40a884615f28556ed6e002"
};

// Inisialisasi Firebase secara aman
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.database();

// Jalankan setelah halaman selesai dimuat sepenuhnya
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login-form");
  const loginContainer = document.querySelector("#login-container");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailField = document.querySelector("#email");
      const passwordField = document.querySelector("#password");

      if (!emailField || !passwordField) return;

      const email = emailField.value.trim();
      const password = passwordField.value.trim();

      // Proses Autentikasi Login ke Firebase
      auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          alert("Login Berhasil!");
          
          // Sembunyikan form login dan rapikan tampilan halaman utama
          if (loginContainer) {
            loginContainer.style.display = "none";
          }
          
          // Tampilkan kembali elemen dashboard atau navigasi
          const dashboardTab = document.querySelector("#tab-dashboard");
          if (dashboardTab) {
            dashboardTab.classList.remove("hidden");
            dashboardTab.style.display = "block";
          }
        })
        .catch((error) => {
          console.error("Auth Error:", error.code, error.message);
          alert("Gagal Masuk: " + error.message);
        });
    });
  }
});
