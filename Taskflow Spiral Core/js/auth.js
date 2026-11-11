// ===== Simulated authentication (hardcoded credentials) =====
const VALID_USER = "admin", VALID_PASS = "1234";

// Login form handler (only runs on index.html)
const form = document.getElementById("loginForm");
if (form) {
  if (sessionStorage.getItem("tf_user")) location.href = "dashboard.html";
  form.addEventListener("submit", e => {
    e.preventDefault();
    const u = document.getElementById("username").value.trim();
    const p = document.getElementById("password").value;
    const err = document.getElementById("loginError");
    if (!u || !p) { err.textContent = "Enter both username and password."; }
    else if (u === VALID_USER && p === VALID_PASS) {
      sessionStorage.setItem("tf_user", u);
      location.href = "dashboard.html";
      return;
    } else { err.textContent = "Invalid username or password. Try again."; }
    err.classList.remove("d-none");
  });
  document.getElementById("togglePw").addEventListener("click", () => {
    const pw = document.getElementById("password");
    pw.type = pw.type === "password" ? "text" : "password";
  });
}
