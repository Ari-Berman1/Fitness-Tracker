function logWorkout() {
  const excersize = document.getElementById("excersize").value;
  const sets = document.getElementById("sets").value;
  const reps = document.getElementById("reps").value;
  const weight = document.getElementById("weight").value;

  const entry = {
    excersize,
    sets: parseInt(sets),
    reps: parseInt(reps),
    weight: parseInt(weight),
    timestamp: new Date().toLocaleString()
  };

  let logs = JSON.parse(localStorage.getItem("workoutLogs") || "[]");
  logs.push(entry);
  localStorage.setItem("workoutLogs", JSON.stringify(logs));

  renderHistory();
  renderGraph();
}

function renderHistory() {
  const logs = JSON.parse(localStorage.getItem("workoutLogs") || "[]");
  const history = document.getElementById("history");
  history.innterHTML = "";
  logs.slice().reverse().forEach(log => {
    const item = document.createElement("li");
    item.textContent = `${log.timestamp}: ${log.excersize} - ${log.sets}x${log.reps} @ $log.weight} lbs`;
    history.appendChild(item);
  });
}

function renderGraph() {
  const logs = JSON.parse(localStorage.getItem("workoutLogs") || "[]");
  const labels = logs.map(l => l.timestamp);
  const data = logs.map(l => l.sets * l.reps * l.weight);

  const ctx = document.getElementById('progressChart').getContext('2d');
  if (window.chartInstance) window.chartInstance.destroy();

  window.chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Total Voluem (lbs)',
        data: data,
        borderColor: '#f33',
        backgroundColor: 'rgba(255, 51, 51, 0.2)'.
        fill: true,
      }]
    },
    options: {
      scales: {
        x: { display: false },
        y: { beginAtZero: true }
      }
    }
  });
}

window.onLoad = () => {
  renderHistory();
  renderGraph();
};
  
