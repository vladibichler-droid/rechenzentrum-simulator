let currentSystemReportText = "";

function getReportMainStatus() {
  const systemStatusElement = document.getElementById("systemStatus");

  if (!systemStatusElement) {
    return "Unbekannt";
  }

  return systemStatusElement.textContent;
}

function getServerName(server) {
  const nameElement = server.querySelector(".server-name");

  if (!nameElement) {
    return "Unbekannter Server";
  }

  return nameElement.textContent;
}

function getServerMetrics(server) {
  const cpu = server.dataset.cpu ? Number(server.dataset.cpu) : null;
  const ram = server.dataset.ram ? Number(server.dataset.ram) : null;
  const temp = server.dataset.temp ? Number(server.dataset.temp) : null;

  return {
    cpu: cpu,
    ram: ram,
    temp: temp
  };
}

function formatServerMetricValue(value, unit) {
  if (value === null || Number.isNaN(value)) {
    return "--";
  }

  return value + unit;
}

function getServerStatusLine(server) {
  const serverName = getServerName(server);
  const metrics = getServerMetrics(server);

  let status = "Normal";

  if (server.classList.contains("failed")) {
    status = "Offline";
  } else if (server.classList.contains("critical")) {
    status = "Kritisch";
  } else if (server.classList.contains("warning")) {
    status = "Warnung";
  } else if (server.classList.contains("maintenance")) {
    status = "Wartung";
  } else if (server.classList.contains("idle")) {
    status = "Bereit";
  }

  return (
    serverName +
    " | Status: " +
    status +
    " | CPU: " +
    formatServerMetricValue(metrics.cpu, " %") +
    " | RAM: " +
    formatServerMetricValue(metrics.ram, " %") +
    " | Temp: " +
    formatServerMetricValue(metrics.temp, " °C")
  );
}

function getCriticalReasons() {
  const reasons = [];

  const criticalServers = document.querySelectorAll(".server.critical, .server.failed");

  criticalServers.forEach(function(server) {
    const serverName = getServerName(server);
    const metrics = getServerMetrics(server);

    if (server.classList.contains("failed")) {
      reasons.push(serverName + " ist offline.");
      return;
    }

    if (metrics.cpu !== null && metrics.cpu >= 80) {
      reasons.push(serverName + " CPU kritisch: " + metrics.cpu + " %.");
    }

    if (metrics.ram !== null && metrics.ram >= 80) {
      reasons.push(serverName + " RAM kritisch: " + metrics.ram + " %.");
    }

    if (metrics.temp !== null && metrics.temp >= 55) {
      reasons.push(serverName + " Temperatur kritisch: " + metrics.temp + " °C.");
    }
  });

  if (networkTraffic.ping >= 100) {
    reasons.push("Ping kritisch: " + networkTraffic.ping + " ms.");
  }

  if (networkTraffic.packetLoss >= 5) {
    reasons.push("Paketverlust kritisch: " + networkTraffic.packetLoss + " %.");
  }

  if (firewallStats.threatLevel === "critical") {
    reasons.push("Firewall meldet kritische Aktivität.");
  }

  if (powerStats.level === "critical") {
    reasons.push("Stromversorgung ist kritisch.");
  }

  if (coolingStats.level === "critical") {
    reasons.push("Kühlung ist kritisch.");
  }

  if (simulationState.active && simulationState.level === "critical") {
    reasons.push("Ausfallsimulation aktiv: " + simulationState.incident + ".");
  }

  return reasons;
}

function getWarningReasons() {
  const reasons = [];

  const warningServers = document.querySelectorAll(".server.warning");

  warningServers.forEach(function(server) {
    const serverName = getServerName(server);
    const metrics = getServerMetrics(server);

    if (metrics.cpu !== null && metrics.cpu >= 60 && metrics.cpu < 80) {
      reasons.push(serverName + " CPU erhöht: " + metrics.cpu + " %.");
    }

    if (metrics.ram !== null && metrics.ram >= 60 && metrics.ram < 80) {
      reasons.push(serverName + " RAM erhöht: " + metrics.ram + " %.");
    }

    if (metrics.temp !== null && metrics.temp >= 45 && metrics.temp < 55) {
      reasons.push(serverName + " Temperatur erhöht: " + metrics.temp + " °C.");
    }
  });

  if (networkTraffic.ping >= 50 && networkTraffic.ping < 100) {
    reasons.push("Ping erhöht: " + networkTraffic.ping + " ms.");
  }

  if (networkTraffic.packetLoss >= 1 && networkTraffic.packetLoss < 5) {
    reasons.push("Paketverlust erkannt: " + networkTraffic.packetLoss + " %.");
  }

  if (firewallStats.threatLevel === "warning") {
    reasons.push("Firewall meldet erhöhte Aktivität.");
  }

  if (powerStats.level === "warning") {
    reasons.push("Stromversorgung zeigt erhöhte Werte.");
  }

  if (coolingStats.level === "warning") {
    reasons.push("Kühlung arbeitet mit erhöhter Leistung.");
  }

  if (simulationState.active && !incidentState.acknowledged) {
    reasons.push("Incident ist noch nicht übernommen.");
  }

  return reasons;
}

function formatReasonList(reasons, emptyText) {
  if (reasons.length === 0) {
    return emptyText + "\n";
  }

  let text = "";

  reasons.forEach(function(reason) {
    text += "- " + reason + "\n";
  });

  return text;
}

function getServerSummaryText() {
  const allServers = document.querySelectorAll(".server");
  const activeServers = document.querySelectorAll(".server.active");
  const warningServers = document.querySelectorAll(".server.warning");
  const criticalServers = document.querySelectorAll(".server.critical, .server.failed");
  const maintenanceServers = document.querySelectorAll(".server.maintenance");

  let text = "";

  text += "Server gesamt: " + allServers.length + "\n";
  text += "Aktive Server: " + activeServers.length + "\n";
  text += "Server mit Warnung: " + warningServers.length + "\n";
  text += "Kritische / ausgefallene Server: " + criticalServers.length + "\n";
  text += "Server in Wartung: " + maintenanceServers.length + "\n";

  return text;
}

function getImportantServerDetailsText() {
  const importantServers = document.querySelectorAll(".server.critical, .server.failed, .server.warning");

  if (importantServers.length === 0) {
    return "Keine auffälligen Serverwerte.\n";
  }

  let text = "";

  importantServers.forEach(function(server) {
    text += "- " + getServerStatusLine(server) + "\n";
  });

  return text;
}

function getReportRecommendation() {
  const criticalReasons = getCriticalReasons();
  const warningReasons = getWarningReasons();

  if (simulationState.active && incidentState.recommendation !== "Keine") {
    return incidentState.recommendation;
  }

  if (criticalReasons.length > 0) {
    const firstReason = criticalReasons[0];

    if (firstReason.includes("CPU") || firstReason.includes("RAM") || firstReason.includes("Temperatur")) {
      return "Kritische Serverwerte prüfen";
    }

    if (firstReason.includes("Ping") || firstReason.includes("Paketverlust")) {
      return "Netzwerk sofort prüfen";
    }

    if (firstReason.includes("Firewall")) {
      return "Firewall und Sicherheitsereignisse prüfen";
    }

    if (firstReason.includes("Strom")) {
      return "Stromversorgung, USV und Notstrom prüfen";
    }

    if (firstReason.includes("Kühlung")) {
      return "Kühlung und Raumtemperatur prüfen";
    }

    return "Kritische Ursache prüfen";
  }

  if (warningReasons.length > 0) {
    const firstWarning = warningReasons[0];

    if (firstWarning.includes("CPU") || firstWarning.includes("RAM") || firstWarning.includes("Temperatur")) {
      return "Serverwerte beobachten";
    }

    if (firstWarning.includes("Ping") || firstWarning.includes("Paketverlust")) {
      return "Netzwerk beobachten";
    }

    if (firstWarning.includes("Firewall")) {
      return "Firewall-Aktivität beobachten";
    }

    if (firstWarning.includes("Strom")) {
      return "Stromwerte beobachten";
    }

    if (firstWarning.includes("Kühlung")) {
      return "Kühlwerte beobachten";
    }

    return "Warnhinweise beobachten";
  }

  return "Keine Sofortmaßnahme notwendig";
}

function buildSystemReportText() {
  const reportTime = getCurrentTime();
  const mainStatus = getReportMainStatus();
  const recommendation = getReportRecommendation();

  const activeIncident = simulationState.active ? incidentState.title : "Keiner";
  const incidentWorkflow = simulationState.active ? incidentState.workflow : "Kein Ticket";
  const incidentPriority = simulationState.active ? incidentState.priority : "Normal";

  const criticalReasons = getCriticalReasons();
  const warningReasons = getWarningReasons();

  return (
    "SYSTEMBERICHT RECHENZENTRUM\n" +
    "============================\n\n" +
    "Zeitpunkt: " + reportTime + "\n" +
    "Systemstatus: " + mainStatus + "\n" +
    "Aktiver Incident: " + activeIncident + "\n" +
    "Incident-Priorität: " + incidentPriority + "\n" +
    "Bearbeitungsstatus: " + incidentWorkflow + "\n\n" +
    "URSACHENANALYSE\n" +
    "---------------\n" +
    "Kritische Gründe:\n" +
    formatReasonList(criticalReasons, "- Keine kritischen Gründe erkannt.") +
    "\nWarnhinweise:\n" +
    formatReasonList(warningReasons, "- Keine Warnhinweise erkannt.") +
    "\nSERVER-ZUSAMMENFASSUNG\n" +
    "----------------------\n" +
    getServerSummaryText() +
    "\nAUFFÄLLIGE SERVER\n" +
    "-----------------\n" +
    getImportantServerDetailsText() +
    "\nNETZWERK\n" +
    "--------\n" +
    "Download: " + networkTraffic.download + " Mbit/s\n" +
    "Upload: " + networkTraffic.upload + " Mbit/s\n" +
    "Ping: " + networkTraffic.ping + " ms\n" +
    "Paketverlust: " + networkTraffic.packetLoss + " %\n\n" +
    "FIREWALL\n" +
    "--------\n" +
    "Firewall-Level: " + firewallStats.threatLevel + "\n" +
    "Blockierte Anfragen: " + firewallStats.blockedRequests + "\n" +
    "Erlaubte Verbindungen: " + firewallStats.allowedConnections + "\n" +
    "Sicherheitsmodus: " + firewallStats.securityMode + "\n\n" +
    "STROMVERSORGUNG\n" +
    "---------------\n" +
    "Stromstatus: " + powerStats.status + "\n" +
    "Netzlast: " + powerStats.gridLoad + " %\n" +
    "USV-Akkustand: " + powerStats.upsBattery + " %\n" +
    "Notstrom bereit: " + (powerStats.generatorReady ? "Ja" : "Nein") + "\n\n" +
    "KÜHLUNG\n" +
    "-------\n" +
    "Kühlstatus: " + coolingStats.status + "\n" +
    "Raumtemperatur: " + coolingStats.roomTemperature + " °C\n" +
    "Kühlleistung: " + coolingStats.coolingPower + " %\n" +
    "Lüfterstatus: " + coolingStats.fanSpeed + " %\n\n" +
    "EMPFEHLUNG\n" +
    "----------\n" +
    recommendation + "\n"
  );
}

function renderSystemReport() {
  const reportHeadline = document.getElementById("reportHeadline");
  const reportIntro = document.getElementById("reportIntro");
  const reportOutput = document.getElementById("systemReportOutput");
  const reportCards = document.querySelectorAll(".report-card");

  if (!reportHeadline || !reportIntro || !reportOutput) {
    return;
  }

  reportCards.forEach(function(card) {
    card.classList.remove("warning", "critical");
  });

  const mainStatus = getReportMainStatus();
  const recommendation = getReportRecommendation();

  currentSystemReportText = buildSystemReportText();

  reportHeadline.textContent = mainStatus;
  reportIntro.textContent = "Empfehlung: " + recommendation;
  reportOutput.textContent = currentSystemReportText;

  if (mainStatus === "Kritisch") {
    reportHeadline.className = "metric-critical";
    reportCards[0].classList.add("critical");
  } else if (mainStatus === "Beobachten") {
    reportHeadline.className = "metric-warning";
    reportCards[0].classList.add("warning");
  } else {
    reportHeadline.className = "metric-secure";
  }
}

function copySystemReport() {
  const copyInfo = document.getElementById("copyReportInfo");

  if (currentSystemReportText === "") {
    renderSystemReport();
  }

  if (navigator.clipboard) {
    navigator.clipboard.writeText(currentSystemReportText).then(function() {
      copyInfo.textContent = "Bericht wurde kopiert.";
      addLogEntry("info", "Systembericht wurde kopiert.");
    }).catch(function() {
      copyInfo.textContent = "Kopieren nicht möglich. Bitte Bericht manuell markieren.";
      addLogEntry("warning", "Systembericht konnte nicht automatisch kopiert werden.");
    });

    return;
  }

  copyInfo.textContent = "Kopieren nicht möglich. Bitte Bericht manuell markieren.";
}

function getReportFileName() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");

  return "systembericht-rechenzentrum-" + year + "-" + month + "-" + day + "-" + hour + "-" + minute + ".txt";
}

function downloadSystemReport() {
  const copyInfo = document.getElementById("copyReportInfo");

  if (currentSystemReportText === "") {
    renderSystemReport();
  }

  const fileName = getReportFileName();
  const blob = new Blob([currentSystemReportText], {
    type: "text/plain;charset=utf-8"
  });

  const downloadLink = document.createElement("a");

  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = fileName;
  downloadLink.style.display = "none";

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);

  URL.revokeObjectURL(downloadLink.href);

  copyInfo.textContent = "Bericht wurde als TXT-Datei gespeichert.";
  addLogEntry("info", "Systembericht wurde als TXT-Datei heruntergeladen.");
}

function setupReportButtons() {
  const updateReportBtn = document.getElementById("updateReportBtn");
  const copyReportBtn = document.getElementById("copyReportBtn");
  const downloadReportBtn = document.getElementById("downloadReportBtn");

  if (updateReportBtn) {
    updateReportBtn.addEventListener("click", function() {
      renderSystemReport();
      addLogEntry("info", "Systembericht wurde aktualisiert.");
    });
  }

  if (copyReportBtn) {
    copyReportBtn.addEventListener("click", copySystemReport);
  }

  if (downloadReportBtn) {
    downloadReportBtn.addEventListener("click", function() {
      renderSystemReport();
      downloadSystemReport();
    });
  }
}