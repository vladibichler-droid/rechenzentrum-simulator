function updateLiveServerValues() {
  const monitoredServers = document.querySelectorAll(".server[data-cpu][data-ram][data-temp]");

  monitoredServers.forEach(function(server) {
    const currentCpu = Number(server.dataset.cpu);
    const currentRam = Number(server.dataset.ram);
    const currentTemp = Number(server.dataset.temp);

    const newCpu = clampValue(currentCpu + getRandomChange(-8, 10), 1, 95);
    const newRam = clampValue(currentRam + getRandomChange(-4, 5), 5, 95);

    let newTemp = currentTemp;

    if (newCpu >= 80 || newRam >= 80) {
      newTemp += getRandomChange(0, 2);
    } else {
      newTemp += getRandomChange(-1, 1);
    }

    newTemp = clampValue(newTemp, 28, 62);

    server.dataset.cpu = newCpu;
    server.dataset.ram = newRam;
    server.dataset.temp = newTemp;
  });
}

function updateServerMetrics() {
  const monitoredServers = document.querySelectorAll(".server[data-cpu][data-ram][data-temp]");

  monitoredServers.forEach(function(server) {
    const cpu = Number(server.dataset.cpu);
    const ram = Number(server.dataset.ram);
    const temp = Number(server.dataset.temp);

    const metricsElement = server.querySelector(".server-metrics");

    metricsElement.innerHTML = `
      <span>CPU <span class="metric ${getMetricClass("cpu", cpu)}">${cpu}%</span></span>
      <span>RAM <span class="metric ${getMetricClass("ram", ram)}">${ram}%</span></span>
      <span>Temp <span class="metric ${getMetricClass("temp", temp)}">${temp}°C</span></span>
    `;

    server.classList.remove("warning", "critical");

    if (cpu >= 80 || ram >= 80 || temp >= 55) {
      server.classList.add("critical");
    } else if (cpu >= 60 || ram >= 60 || temp >= 45) {
      server.classList.add("warning");
    }
  });
}

function calculateDatacenterOverview() {
  const activeServers = document.querySelectorAll(".server.active");
  const monitoredServers = document.querySelectorAll(".server[data-cpu][data-ram][data-temp]");

  let totalCpu = 0;
  let totalRam = 0;
  let totalTemp = 0;

  monitoredServers.forEach(function(server) {
    totalCpu += Number(server.dataset.cpu);
    totalRam += Number(server.dataset.ram);
    totalTemp += Number(server.dataset.temp);
  });

  const serverCount = monitoredServers.length;

  const averageCpu = Math.round(totalCpu / serverCount);
  const averageRam = Math.round(totalRam / serverCount);
  const averageTemp = Math.round(totalTemp / serverCount);

  const averageCpuElement = document.getElementById("averageCpu");
  const averageRamElement = document.getElementById("averageRam");
  const averageTempElement = document.getElementById("averageTemp");

  document.getElementById("activeServers").textContent = activeServers.length;

  averageCpuElement.textContent = averageCpu + " %";
  averageRamElement.textContent = averageRam + " %";
  averageTempElement.textContent = averageTemp + " °C";

  averageCpuElement.className = getMetricClass("cpu", averageCpu);
  averageRamElement.className = getMetricClass("ram", averageRam);
  averageTempElement.className = getMetricClass("temp", averageTemp);
}

function checkServerWarnings() {
  const monitoredServers = document.querySelectorAll(".server[data-cpu][data-ram][data-temp]");

  monitoredServers.forEach(function(server) {
    const serverName = server.querySelector(".server-name").textContent;
    const cpu = Number(server.dataset.cpu);
    const ram = Number(server.dataset.ram);
    const temp = Number(server.dataset.temp);

    let message = "";
    let level = "";

    if (cpu >= 85) {
      level = "critical";
      message = serverName + " CPU-Auslastung kritisch: " + cpu + "%";
    } else if (ram >= 85) {
      level = "critical";
      message = serverName + " RAM-Auslastung kritisch: " + ram + "%";
    } else if (temp >= 58) {
      level = "critical";
      message = serverName + " Temperatur kritisch: " + temp + "°C";
    } else if (cpu >= 70) {
      level = "warning";
      message = serverName + " CPU-Auslastung erhöht: " + cpu + "%";
    } else if (ram >= 70) {
      level = "warning";
      message = serverName + " RAM-Auslastung erhöht: " + ram + "%";
    } else if (temp >= 48) {
      level = "warning";
      message = serverName + " Temperatur erhöht: " + temp + "°C";
    }

    if (message !== "" && !isWarningMessageKnown(message)) {
      addLogEntry(level, message);
      rememberWarningMessage(message);
    }
  });
}