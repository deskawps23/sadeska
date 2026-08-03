const firebaseConfig = {
  apiKey: "AIzaSyAHGLNVtubgL41YZuZL3I4QwqUR6NBNfqQ",
  authDomain: "si-deska-wps.firebaseapp.com",
  databaseURL: "https://si-deska-wps-default-rtdb.firebaseio.com",
  projectId: "si-deska-wps",
  storageBucket: "si-deska-wps.appspot.com",
  messagingSenderId: "595163960871",
  appId: "1:595163960871:web:40a884615f28556ed6e002"
};

// Inisialisasi Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const emailInput = document.querySelector("#email");
      const passwordInput = document.querySelector("#password");

      if (!emailInput || !passwordInput) return;

      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          alert("Login Berhasil!");
          
          // Alih-alih menyembunyikan dengan cara yang merusak layout, 
          // kita arahkan halaman untuk memuat ulang ke tampilan bersih atau reload
          window.location.reload();
        })
        .catch((error) => {
          alert("Gagal Masuk: " + error.message);
        });
    });
  }
});
