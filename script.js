const firebaseConfig = {
  apiKey: "SALIN_API_KEY_ASLI_DARI_FIREBASE_DISINI",
  authDomain: "si-deska-wps.firebaseapp.com",
  databaseURL: "https://si-deska-wps-default-rtdb.firebaseio.com",
  projectId: "si-deska-wps",
  storageBucket: "si-deska-wps.appspot.com",
  messagingSenderId: "595163960871",
  appId: "SALIN_APP_ID_ASLI_DARI_FIREBASE_DISINI"
};

// Inisialisasi Firebase & Auth (Sangat penting agar fungsi login jalan)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      
      auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          alert("Login Berhasil!");
        })
        .catch((error) => {
          alert("Gagal Masuk: " + error.message);
        });
    });
  }
});
