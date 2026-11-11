// ===== Shared navbar + footer, injected on every page for consistency =====
// Guard: redirect to login if not signed in
if (!sessionStorage.getItem("tf_user")) location.href = "index.html";

const pages = [["dashboard.html","Dashboard"],["tasks.html","Tasks"],["team.html","Team"]];
const here = location.pathname.split("/").pop() || "dashboard.html";

document.getElementById("nav").innerHTML = `
<nav class="navbar navbar-expand-md tf-nav navbar-dark">
  <div class="container">
    <a class="navbar-brand" href="dashboard.html">Spiral <span>Core</span></a>
    <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu" aria-label="Toggle menu"><span class="navbar-toggler-icon"></span></button>
    <div class="collapse navbar-collapse" id="menu">
      <ul class="navbar-nav me-auto">
        ${pages.map(([h,l]) => `<li class="nav-item"><a class="nav-link ${h===here?"active":""}" href="${h}">${l}</a></li>`).join("")}
      </ul>
      <span class="text-white-50 me-3">Signed in as ${sessionStorage.getItem("tf_user")}</span>
      <button id="logout" class="btn btn-sm btn-outline-light">Log out</button>
    </div>
  </div>
</nav>`;

document.getElementById("foot").innerHTML = `
<footer class="tf-footer"><div class="container d-flex flex-column flex-md-row justify-content-between gap-2">
  <span>&copy; 2026 Spiral Core. IMS566 Individual Project, UiTM.</span>
  <span>Built with Bootstrap 5 and Chart.js &middot; <a href="https://github.com/" target="_blank" rel="noopener">GitHub</a></span>
</div></footer>`;

document.getElementById("logout").onclick = () => { sessionStorage.removeItem("tf_user"); location.href = "index.html"; };

// Helper: badge class for a task status
const badge = s => s === "Done" ? "badge-done" : s === "In Progress" ? "badge-progress" : "badge-todo";
