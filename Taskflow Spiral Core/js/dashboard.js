// ===== Dashboard: summary cards + charts built from TASKS =====
const count = s => TASKS.filter(t => t.status === s).length;
const done = count("Done"), prog = count("In Progress"), todo = count("To Do");

document.getElementById("sTotal").textContent = TASKS.length;
document.getElementById("sDone").textContent = done;
document.getElementById("sProg").textContent = prog;
document.getElementById("sRate").textContent = Math.round(done / TASKS.length * 100) + "%";

// Doughnut: tasks by status
new Chart(document.getElementById("statusChart"), {
  type: "doughnut",
  data: {labels: ["To Do","In Progress","Done"], datasets: [{data: [todo,prog,done], backgroundColor: ["#b9c7c1","#e3a12f","#2f6f5e"]}]},
  options: {maintainAspectRatio: false, plugins: {legend: {position: "bottom"}}}
});

// Bar: tasks per team member (interactive tooltips)
const owners = TEAM.map(m => m.name);
new Chart(document.getElementById("ownerChart"), {
  type: "bar",
  data: {labels: owners, datasets: [{label: "Tasks assigned", data: owners.map(o => TASKS.filter(t => t.owner === o).length), backgroundColor: "#2f6f5e"}]},
  options: {maintainAspectRatio: false, scales: {y: {beginAtZero: true, ticks: {stepSize: 1}}}, plugins: {legend: {display: false}}}
});

// Upcoming deadlines (next 4 unfinished tasks)
document.getElementById("upcoming").innerHTML = TASKS.filter(t => t.status !== "Done")
  .sort((a,b) => a.due.localeCompare(b.due)).slice(0,4)
  .map(t => `<li class="list-group-item d-flex justify-content-between"><span>${t.title}</span><small class="text-muted">${t.due}</small></li>`).join("");

// ===== Chart 3: Pie - tasks by priority =====
const prios = ["High","Medium","Low"];
new Chart(document.getElementById("priorityChart"), {
  type: "pie",
  data: {labels: prios, datasets: [{data: prios.map(p => TASKS.filter(t => t.priority === p).length), backgroundColor: ["#c0392b","#e3a12f","#2f6f5e"]}]},
  options: {maintainAspectRatio: false, plugins: {legend: {position: "bottom"}}}
});

// ===== Chart 4: Stacked bar - status breakdown per member =====
const statuses = [["To Do","#b9c7c1"],["In Progress","#e3a12f"],["Done","#2f6f5e"]];
new Chart(document.getElementById("memberStatusChart"), {
  type: "bar",
  data: {labels: owners, datasets: statuses.map(([s,c]) => ({label: s, backgroundColor: c, data: owners.map(o => TASKS.filter(t => t.owner === o && t.status === s).length)}))},
  options: {maintainAspectRatio: false, scales: {x: {stacked: true}, y: {stacked: true, beginAtZero: true, ticks: {stepSize: 1}}}, plugins: {legend: {position: "bottom"}}}
});

// ===== Chart 5: Line - number of deadlines per week (Monday of each week) =====
function weekStart(d) {
  const x = new Date(d); x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
  return x.toISOString().slice(0,10);
}
const weeks = {};
TASKS.forEach(t => { const w = weekStart(t.due); weeks[w] = (weeks[w] || 0) + 1; });
const weekLabels = Object.keys(weeks).sort();
new Chart(document.getElementById("weekChart"), {
  type: "line",
  data: {labels: weekLabels.map(w => "Week of " + w.slice(5)), datasets: [{label: "Tasks due", data: weekLabels.map(w => weeks[w]), borderColor: "#2f6f5e", backgroundColor: "rgba(47,111,94,.15)", fill: true, tension: .3}]},
  options: {maintainAspectRatio: false, scales: {y: {beginAtZero: true, ticks: {stepSize: 1}}}, plugins: {legend: {display: false}}}
});

