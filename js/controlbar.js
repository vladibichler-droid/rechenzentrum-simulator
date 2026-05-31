function setControlCardState(card, level) {
  card.classList.remove("secure", "warning", "critical");

  if (level === "critical") {
    card.classList.add("critical");
  } else if (level === "warning") {
    card.classList.add("warning");
  } else {
    card.classList.add("secure");
  }
}

function setControlTextClass(element, level) {
  element.className = "";

  if (level === "critical") {
    element.classList.add("metric-critical");
  } else if (level === "warning") {
    element.classList.add("metric-warning");
  } else {
    element.classList.add("metric-secure");
  }
}

function getControlLevelFromText(value) {
  if (value === "Kritisch") {
    return "critical";
  }

  if (value === "Beobachten") {
    return "warning";
  }

  return "secure";
}

function getPingControlLevel() {
  if (networkTraffic.ping >= 100) {
    return "critical";
  }

  if (networkTraffic.ping >= 50) {
    return "warning";
  }

  return "secure";
}

function renderControlBar() {
  const controlSystemStatus = document.getElementById("controlSystemStatus");
  const controlSystemText = document.getElementById("controlSystemText");
  const controlIncident = document.getElementById("controlIncident");
  const controlIncidentText = document.getElementById("controlIncidentText");
  const controlWarningCount = document.getElementById("controlWarningCount");
  const controlPing = document.getElementById("controlPing");
  const controlPower = document.getElementById("controlPower");
  const controlPowerText = document.getElementById("controlPowerText");
  const controlCooling = document.getElementById("controlCooling");
  const controlCoolingText = document.getElementById("controlCoolingText");

  const controlCards = document.querySelectorAll(".control-card");

  const systemStatus = document.getElementById("systemStatus").textContent;
  const systemText = document.getElementById("systemStatusText").textContent;
  const warningCount = document.getElementById("warningCount").textContent;

  const systemLevel = getControlLevelFromText(systemStatus);
  const incidentLevel = simulationState.active ? "critical" : "secure";
  const pingLevel = getPingControlLevel();
  const powerLevel = powerStats.level;
  const coolingLevel = coolingStats.level;

  controlSystemStatus.textContent = systemStatus;
  controlSystemText.textContent = systemText;

  controlIncident.textContent = simulationState.active ? incidentState.title : "Keiner";
  controlIncidentText.textContent = simulationState.active ? incidentState.workflow : "Kein aktiver Incident.";

  controlWarningCount.textContent = warningCount;

  controlPing.textContent = networkTraffic.ping + " ms";

  controlPower.textContent = powerStats.status;
  controlPowerText.textContent = "Netzlast " + powerStats.gridLoad + " % · USV " + powerStats.upsBattery + " %";

  controlCooling.textContent = coolingStats.status;
  controlCoolingText.textContent = "Raum " + coolingStats.roomTemperature + " °C · Lüfter " + coolingStats.fanSpeed + " %";

  setControlTextClass(controlSystemStatus, systemLevel);
  setControlTextClass(controlIncident, incidentLevel);
  setControlTextClass(controlWarningCount, Number(warningCount) >= 5 ? "warning" : "secure");
  setControlTextClass(controlPing, pingLevel);
  setControlTextClass(controlPower, powerLevel);
  setControlTextClass(controlCooling, coolingLevel);

  setControlCardState(controlCards[0], systemLevel);
  setControlCardState(controlCards[1], incidentLevel);
  setControlCardState(controlCards[2], Number(warningCount) >= 5 ? "warning" : "secure");
  setControlCardState(controlCards[3], pingLevel);
  setControlCardState(controlCards[4], powerLevel);
  setControlCardState(controlCards[5], coolingLevel);
}