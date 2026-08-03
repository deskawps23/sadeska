const firebaseConfig = {
  apiKey: "AIzaSyAHGLNVtubgL4lYZuZL3I4QwqUR6NBNfqQ",
  authDomain: "si-deska-wps.firebaseapp.com",
  databaseURL: "https://si-deska-wps-default-rtdb.firebaseio.com",
  projectId: "si-deska-wps",
  storageBucket: "si-deska-wps.appspot.com",
  messagingSenderId: "595163960871",
  appId: "1:595163960871:web:40a884615f28556ed6e002"
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
