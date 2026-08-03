// Konfigurasi Firebase Proyek Si DESKA WPS
const firebaseConfig = {
  apiKey: "MASUKKAN_API_KEY_ANDA_DI_SINI",
  authDomain: "si-deska-wps.firebaseapp.com",
  databaseURL: "https://si-deska-wps-default-rtdb.firebaseio.com",
  projectId: "si-deska-wps",
  storageBucket: "si-deska-wps.appspot.com",
  messagingSenderId: "595163960871",
  appId: "MASUKKAN_APP_ID_ANDA_DI_SINI"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Fungsi Login
function handleLogin(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("Login Berhasil:", userCredential.user);
      alert("Login Berhasil!");
    })
    .catch((error) => {
      console.error("Error Login:", error.code, error.message);
      alert("Gagal Masuk: " + error.message);
    });
}

// Event listener saat form login disubmit
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login-form"); 
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      handleLogin(email, password);
    });
  }
});
