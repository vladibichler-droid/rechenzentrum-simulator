let downloadHistory = [];
let uploadHistory = [];

const maxChartItems = 20;

function addTrafficHistoryPoint() {
  downloadHistory.push(networkTraffic.download);
  uploadHistory.push(networkTraffic.upload);

  if (downloadHistory.length > maxChartItems) {
    downloadHistory.shift();
  }

  if (uploadHistory.length > maxChartItems) {
    uploadHistory.shift();
  }
}

function renderBarChart(containerId, values, maxValue, type) {
  const chart = document.getElementById(containerId);

  chart.innerHTML = "";

  values.forEach(function(value) {
    const bar = document.createElement("div");

    if (type === "upload") {
      bar.className = "chart-bar upload";
    } else {
      bar.className = "chart-bar";
    }

    const height = Math.max(8, Math.round((value / maxValue) * 100));
    bar.style.height = height + "%";

    chart.appendChild(bar);
  });
}

function renderTrafficCharts() {
  const downloadChartValue = document.getElementById("downloadChartValue");
  const uploadChartValue = document.getElementById("uploadChartValue");

  downloadChartValue.textContent = networkTraffic.download + " Mbit/s";
  uploadChartValue.textContent = networkTraffic.upload + " Mbit/s";

  renderBarChart("downloadChart", downloadHistory, 1200, "download");
  renderBarChart("uploadChart", uploadHistory, 500, "upload");
}

function updateTrafficCharts() {
  addTrafficHistoryPoint();
  renderTrafficCharts();
}