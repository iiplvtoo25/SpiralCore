// ===== Tasks table with search + status filter =====
const body = document.getElementById("taskBody");
const q = document.getElementById("search"), f = document.getElementById("filter");
function render() {
  const rows = TASKS.filter(t => t.title.toLowerCase().includes(q.value.toLowerCase()) && (!f.value || t.status === f.value));
  body.innerHTML = rows.length ? rows.map(t => `<tr><td>${t.id}</td><td>${t.title}</td><td>${t.owner}</td><td>${t.priority}</td>
    <td><span class="badge ${badge(t.status)}">${t.status}</span></td><td>${t.due}</td></tr>`).join("")
    : `<tr><td colspan="6" class="text-center text-muted">No tasks match. Clear the search or filter.</td></tr>`;
}
q.oninput = f.onchange = render; render();
