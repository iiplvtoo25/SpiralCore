// ===== Team member cards =====
document.getElementById("teamGrid").innerHTML = TEAM.map(m => {
  const n = TASKS.filter(t => t.owner === m.name).length;
  return `<div class="col-sm-6 col-lg-3"><div class="tf-card h-100 text-center">
    <div class="avatar mx-auto mb-3">${m.name[0]}</div>
    <h3 class="h5">${m.name}</h3><p class="text-muted mb-1">${m.role}</p>
    <p class="small mb-2"><a href="mailto:${m.email}">${m.email}</a></p>
    <span class="badge badge-progress">${n} tasks</span>
    <p class="small text-muted mt-2 mb-0">Joined ${m.joined}</p></div></div>`;
}).join("");
