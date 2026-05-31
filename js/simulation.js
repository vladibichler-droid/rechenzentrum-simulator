let simulationState = {
  active: false,
  type: "none",
  level: "secure",
  status: "Bereit",
  incident: "Keiner",
  impact: "System arbeitet normal.",
  failedServer: null,
  failedServerBackup: null
};

function clearServerFailure() {
  if (simulationState.failedServer && simulationState.failedServerBackup) {
    const server = simulationState.failedServer;
    const backup = simulationState.failedServerBackup;

    server.dataset.cpu = backup.cpu;
    server.dataset.ram = backup.ram;
    server.dataset.temp = backup.temp;

    server.className = backup.className;

    const metricsElement = server.querySelector(".server-metrics");
    metricsElement.innerHTML = "";
  }

  simulationState.failedServer = null;
  simulationState.failedServerBackup = null;
}

function resetSimulation() {
  clearServerFailure();

  networkTraffic.download = 842;
  networkTraffic.upload = 214;
  networkTraffic.ping = 8;
  networkTraffic.packetLoss = 0;

  powerStats.status = "Normal";
  powerStats.level = "secure";
  powerStats.gridLoad = 58;
  powerStats.upsBattery = 96;
  powerStats.generatorReady = true;

  coolingStats.status = "Normal";
  coolingStats.level = "secure";
  coolingStats.roomTemperature = 22;
  coolingStats.coolingPower = 58;
  coolingStats.fanSpeed = 46;

  simulationState.active = false;
  simulationState.type = "none";
  simulationState.level = "secure";
  simulationState.status = "Bereit";
  simulationState.incident = "Keiner";
  simulationState.impact = "System arbeitet normal.";

  renderSimulationState();
  renderNetworkTraffic();
  renderPowerStats();
  renderCoolingStats();
  updateServerMetrics();
  calculateDatacenterOverview();
  updateSystemStatus();

  addLogEntry("info", "Simulation zurückgesetzt.");
}

function startServerFailureSimulation() {
  resetSimulation();

  const server = document.querySelector(".server.active[data-cpu][data-ram][data-temp]");

  if (!server) {
    addLogEntry("warning", "Keine aktiven Server für Ausfallsimulation gefunden.");
    return;
  }

  simulationState.failedServer = server;
  simulationState.failedServerBackup = {
    cpu: server.dataset.cpu,
    ram: server.dataset.ram,
    temp: server.dataset.temp,
    className: server.className
  };

  const serverName = server.querySelector(".server-name").textContent;

  server.dataset.cpu = 0;
  server.dataset.ram = 0;
  server.dataset.temp = 0;

  server.classList.remove("active", "warning");
  server.classList.add("failed", "critical");

  simulationState.active = true;
  simulationState.type = "server";
  simulationState.level = "critical";
  simulationState.status = "Kritisch";
  simulationState.incident = "Server-Ausfall";
  simulationState.impact = serverName + " ist offline.";

  updateServerMetrics();
  applySimulationEffects();
  calculateDatacenterOverview();
  renderSimulationState();
  updateSystemStatus();

  addLogEntry("critical", serverName + " wurde durch Simulation offline gesetzt.");
}

function startNetworkFailureSimulation() {
  resetSimulation();

  simulationState.active = true;
  simulationState.type = "network";
  simulationState.level = "critical";
  simulationState.status = "Kritisch";
  simulationState.incident = "Netzwerkstörung";
  simulationState.impact = "Ping und Paketverlust sind kritisch erhöht.";

  networkTraffic.download = 240;
  networkTraffic.upload = 38;
  networkTraffic.ping = 138;
  networkTraffic.packetLoss = 6;

  renderNetworkTraffic();
  renderSimulationState();
  updateSystemStatus();

  addLogEntry("critical", "Netzwerkstörung simuliert: Ping und Paketverlust kritisch.");
}

function startPowerFailureSimulation() {
  resetSimulation();

  simulationState.active = true;
  simulationState.type = "power";
  simulationState.level = "critical";
  simulationState.status = "Kritisch";
  simulationState.incident = "Stromproblem";
  simulationState.impact = "Netzlast kritisch, USV-Reserve niedrig, Notstrom gestört.";

  powerStats.status = "Kritisch";
  powerStats.level = "critical";
  powerStats.gridLoad = 94;
  powerStats.upsBattery = 42;
  powerStats.generatorReady = false;

  renderPowerStats();
  renderSimulationState();
  updateSystemStatus();

  addLogEntry("critical", "Stromproblem simuliert: USV und Notstrom benötigen Aufmerksamkeit.");
}

function startCoolingFailureSimulation() {
  resetSimulation();

  simulationState.active = true;
  simulationState.type = "cooling";
  simulationState.level = "critical";
  simulationState.status = "Kritisch";
  simulationState.incident = "Kühlproblem";
  simulationState.impact = "Raumtemperatur und Kühlleistung sind kritisch.";

  coolingStats.status = "Kritisch";
  coolingStats.level = "critical";
  coolingStats.roomTemperature = 34;
  coolingStats.coolingPower = 98;
  coolingStats.fanSpeed = 96;

  renderCoolingStats();
  renderSimulationState();
  updateSystemStatus();

  addLogEntry("critical", "Kühlproblem simuliert: Raumtemperatur kritisch erhöht.");
}

function applySimulationEffects() {
  if (!simulationState.active) {
    return;
  }

  if (simulationState.type === "server" && simulationState.failedServer) {
    const server = simulationState.failedServer;
    const metricsElement = server.querySelector(".server-metrics");

    server.dataset.cpu = 0;
    server.dataset.ram = 0;
    server.dataset.temp = 0;

    server.classList.remove("active", "warning");
    server.classList.add("failed", "critical");

    metricsElement.innerHTML = `
      <span>Status <span class="metric metric-critical">Offline</span></span>
      <span>CPU <span class="metric metric-critical">0%</span></span>
      <span>RAM <span class="metric metric-critical">0%</span></span>
    `;
  }

  if (simulationState.type === "network") {
    networkTraffic.download = Math.min(networkTraffic.download, 280);
    networkTraffic.upload = Math.min(networkTraffic.upload, 55);
    networkTraffic.ping = Math.max(networkTraffic.ping, 120);
    networkTraffic.packetLoss = Math.max(networkTraffic.packetLoss, 5);
  }

  if (simulationState.type === "power") {
    powerStats.status = "Kritisch";
    powerStats.level = "critical";
    powerStats.gridLoad = Math.max(powerStats.gridLoad, 90);
    powerStats.upsBattery = Math.min(powerStats.upsBattery, 45);
    powerStats.generatorReady = false;
  }

  if (simulationState.type === "cooling") {
    coolingStats.status = "Kritisch";
    coolingStats.level = "critical";
    coolingStats.roomTemperature = Math.max(coolingStats.roomTemperature, 32);
    coolingStats.coolingPower = Math.max(coolingStats.coolingPower, 95);
    coolingStats.fanSpeed = Math.max(coolingStats.fanSpeed, 92);
  }
}

function renderSimulationState() {
  const simulationStatus = document.getElementById("simulationStatus");
  const simulationStatusText = document.getElementById("simulationStatusText");
  const activeIncident = document.getElementById("activeIncident");
  const incidentImpact = document.getElementById("incidentImpact");
  const simulationCards = document.querySelectorAll(".simulation-card");

  simulationCards.forEach(function(card) {
    card.classList.remove("warning", "critical");
  });

  simulationStatus.textContent = simulationState.status;
  activeIncident.textContent = simulationState.incident;
  incidentImpact.textContent = simulationState.impact;

  if (simulationState.level === "critical") {
    simulationStatus.className = "metric-critical";
    simulationStatusText.textContent = "Eine kritische Simulation ist aktiv.";
    simulationCards[0].classList.add("critical");
    simulationCards[1].classList.add("critical");
  } else if (simulationState.level === "warning") {
    simulationStatus.className = "metric-warning";
    simulationStatusText.textContent = "Eine Simulation wird beobachtet.";
    simulationCards[0].classList.add("warning");
    simulationCards[1].classList.add("warning");
  } else {
    simulationStatus.className = "metric-secure";
    simulationStatusText.textContent = "Keine aktive Simulation.";
  }
}

function checkSimulationWarnings() {
  if (!simulationState.active) {
    return;
  }

  let message = "";

  if (simulationState.type === "server") {
    message = "Simulation aktiv: Server-Ausfall.";
  }

  if (simulationState.type === "network") {
    message = "Simulation aktiv: Netzwerkstörung.";
  }

  if (simulationState.type === "power") {
    message = "Simulation aktiv: Stromproblem.";
  }

  if (simulationState.type === "cooling") {
    message = "Simulation aktiv: Kühlproblem.";
  }

  if (message !== "" && !isWarningMessageKnown(message)) {
    addLogEntry("critical", message);
    rememberWarningMessage(message);
  }
}

function setupSimulationButtons() {
  document
    .getElementById("simulateServerFailureBtn")
    .addEventListener("click", startServerFailureSimulation);

  document
    .getElementById("simulateNetworkFailureBtn")
    .addEventListener("click", startNetworkFailureSimulation);

  document
    .getElementById("simulatePowerFailureBtn")
    .addEventListener("click", startPowerFailureSimulation);

  document
    .getElementById("simulateCoolingFailureBtn")
    .addEventListener("click", startCoolingFailureSimulation);

  document
    .getElementById("resetSimulationBtn")
    .addEventListener("click", resetSimulation);
}