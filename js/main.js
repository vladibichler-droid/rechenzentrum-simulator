let datacenterIntervalId = null;

let appSettings = {
  updateSpeed: "normal",
  intervalMs: 4000,
  simulationMode: "realistic",
  logLimit: 30
};

function loadAppSettings() {
  const savedSettings = localStorage.getItem("datacenterSettings");

  if (!savedSettings) {
    appSettings.intervalMs = getUpdateIntervalFromSpeed(appSettings.updateSpeed);
    return;
  }

  try {
    const parsedSettings = JSON.parse(savedSettings);

    if (parsedSettings.updateSpeed) {
      appSettings.updateSpeed = parsedSettings.updateSpeed;
    }

    if (parsedSettings.simulationMode) {
      appSettings.simulationMode = parsedSettings.simulationMode;
    }

    if (parsedSettings.logLimit) {
      appSettings.logLimit = Number(parsedSettings.logLimit);
    }

    appSettings.intervalMs = getUpdateIntervalFromSpeed(appSettings.updateSpeed);
  } catch (error) {
    appSettings.intervalMs = getUpdateIntervalFromSpeed(appSettings.updateSpeed);
  }
}

function saveAppSettings() {
  localStorage.setItem("datacenterSettings", JSON.stringify({
    updateSpeed: appSettings.updateSpeed,
    simulationMode: appSettings.simulationMode,
    logLimit: appSettings.logLimit
  }));
}

function resetAppSettings() {
  appSettings.updateSpeed = "normal";
  appSettings.intervalMs = getUpdateIntervalFromSpeed(appSettings.updateSpeed);
  appSettings.simulationMode = "realistic";
  appSettings.logLimit = 30;

  saveAppSettings();

  const updateSpeedSelect = document.getElementById("updateSpeedSelect");
  const simulationModeSelect = document.getElementById("simulationModeSelect");
  const logLimitSelect = document.getElementById("logLimitSelect");

  if (updateSpeedSelect) {
    updateSpeedSelect.value = appSettings.updateSpeed;
  }

  if (simulationModeSelect) {
    simulationModeSelect.value = appSettings.simulationMode;
  }

  if (logLimitSelect) {
    logLimitSelect.value = String(appSettings.logLimit);
  }

  if (typeof setLogLimit === "function") {
    setLogLimit(appSettings.logLimit);
  }

  restartDatacenterTimer();
  renderSettingsSummary();

  addLogEntry("info", "Einstellungen wurden zurückgesetzt.");
}

function getUpdateIntervalFromSpeed(speed) {
  if (speed === "slow") {
    return 7000;
  }

  if (speed === "fast") {
    return 2000;
  }

  return 4000;
}

function getUpdateSpeedLabel() {
  if (appSettings.updateSpeed === "slow") {
    return "Langsam";
  }

  if (appSettings.updateSpeed === "fast") {
    return "Schnell";
  }

  return "Normal";
}

function getSimulationModeLabel() {
  if (appSettings.simulationMode === "calm") {
    return "Ruhig";
  }

  if (appSettings.simulationMode === "critical") {
    return "Kritisch";
  }

  return "Realistisch";
}

function createSettingsNavigationLink() {
  const navigation = document.querySelector(".jump-nav-grid");

  if (!navigation) {
    return;
  }

  const existingLink = navigation.querySelector('a[href="#settings"]');

  if (existingLink) {
    return;
  }

  const settingsLink = document.createElement("a");
  settingsLink.className = "jump-link";
  settingsLink.href = "#settings";
  settingsLink.textContent = "Einstellungen";

  navigation.appendChild(settingsLink);
}

function createSettingsPanel() {
  const existingSettings = document.getElementById("settings");

  if (existingSettings) {
    return;
  }

  const jumpNavigationSection = document.querySelector(".jump-nav-section");

  if (!jumpNavigationSection) {
    return;
  }

  const settingsSection = document.createElement("section");
  settingsSection.id = "settings";
  settingsSection.className = "report-section";

  settingsSection.innerHTML = `
    <div class="section-header">
      <h2>Einstellungen</h2>
      <span>Simulationsmodus</span>
    </div>

    <div class="control-grid">
      <article class="control-card">
        <span class="control-label">Aktualisierung</span>
        <strong id="settingsSpeedStatus">--</strong>
        <p>Wie schnell sich die Live-Werte ändern.</p>

        <select id="updateSpeedSelect" class="settings-select">
          <option value="slow">Langsam · 7 Sekunden</option>
          <option value="normal">Normal · 4 Sekunden</option>
          <option value="fast">Schnell · 2 Sekunden</option>
        </select>
      </article>

      <article class="control-card">
        <span class="control-label">Simulationsmodus</span>
        <strong id="settingsModeStatus">--</strong>
        <p>Wie ruhig oder kritisch sich das System verhält.</p>

        <select id="simulationModeSelect" class="settings-select">
          <option value="calm">Ruhig</option>
          <option value="realistic">Realistisch</option>
          <option value="critical">Kritisch</option>
        </select>
      </article>

      <article class="control-card">
        <span class="control-label">Log-Limit</span>
        <strong id="settingsLogLimitStatus">--</strong>
        <p>Maximale Anzahl der sichtbaren Log-Einträge.</p>

        <select id="logLimitSelect" class="settings-select">
          <option value="30">30 Einträge</option>
          <option value="50">50 Einträge</option>
          <option value="100">100 Einträge</option>
        </select>
      </article>

      <article class="control-card">
        <span class="control-label">Aktueller Modus</span>
        <strong id="settingsSummaryStatus">--</strong>
        <p id="settingsSummaryText">Einstellungen werden geladen.</p>
      </article>

      <article class="control-card">
        <span class="control-label">Zurücksetzen</span>
        <strong class="metric-secure">Standard</strong>
        <p>Setzt alles auf die empfohlenen Standardwerte zurück.</p>

        <button id="resetSettingsBtn" class="report-button" type="button">
          Einstellungen zurücksetzen
        </button>
      </article>
    </div>
  `;

  jumpNavigationSection.after(settingsSection);
  createSettingsNavigationLink();
  styleSettingsControls();
  setupSettingsControls();
  renderSettingsSummary();
}

function styleSettingsControls() {
  const selectElements = document.querySelectorAll(".settings-select");

  selectElements.forEach(function(selectElement) {
    selectElement.style.width = "100%";
    selectElement.style.marginTop = "16px";
    selectElement.style.padding = "12px 14px";
    selectElement.style.color = "#dbeafe";
    selectElement.style.background = "#06101d";
    selectElement.style.border = "1px solid #29486f";
    selectElement.style.borderRadius = "12px";
    selectElement.style.fontSize = "14px";
    selectElement.style.fontWeight = "800";
    selectElement.style.outline = "none";
  });

  const resetSettingsBtn = document.getElementById("resetSettingsBtn");

  if (resetSettingsBtn) {
    resetSettingsBtn.style.marginTop = "16px";
  }
}

function setupSettingsControls() {
  const updateSpeedSelect = document.getElementById("updateSpeedSelect");
  const simulationModeSelect = document.getElementById("simulationModeSelect");
  const logLimitSelect = document.getElementById("logLimitSelect");
  const resetSettingsBtn = document.getElementById("resetSettingsBtn");

  if (updateSpeedSelect) {
    updateSpeedSelect.value = appSettings.updateSpeed;

    updateSpeedSelect.addEventListener("change", function() {
      appSettings.updateSpeed = updateSpeedSelect.value;
      appSettings.intervalMs = getUpdateIntervalFromSpeed(appSettings.updateSpeed);

      saveAppSettings();
      restartDatacenterTimer();
      renderSettingsSummary();

      addLogEntry("info", "Aktualisierung geändert: " + getUpdateSpeedLabel() + ".");
    });
  }

  if (simulationModeSelect) {
    simulationModeSelect.value = appSettings.simulationMode;

    simulationModeSelect.addEventListener("change", function() {
      appSettings.simulationMode = simulationModeSelect.value;

      saveAppSettings();
      renderSettingsSummary();

      addLogEntry("info", "Simulationsmodus geändert: " + getSimulationModeLabel() + ".");
    });
  }

  if (logLimitSelect) {
    logLimitSelect.value = String(appSettings.logLimit);

    logLimitSelect.addEventListener("change", function() {
      appSettings.logLimit = Number(logLimitSelect.value);

      saveAppSettings();

      if (typeof setLogLimit === "function") {
        setLogLimit(appSettings.logLimit);
      }

      renderSettingsSummary();

      addLogEntry("info", "Log-Limit geändert: " + appSettings.logLimit + " Einträge.");
    });
  }

  if (resetSettingsBtn) {
    resetSettingsBtn.addEventListener("click", resetAppSettings);
  }
}

function renderSettingsSummary() {
  const settingsSpeedStatus = document.getElementById("settingsSpeedStatus");
  const settingsModeStatus = document.getElementById("settingsModeStatus");
  const settingsLogLimitStatus = document.getElementById("settingsLogLimitStatus");
  const settingsSummaryStatus = document.getElementById("settingsSummaryStatus");
  const settingsSummaryText = document.getElementById("settingsSummaryText");

  if (
    !settingsSpeedStatus ||
    !settingsModeStatus ||
    !settingsLogLimitStatus ||
    !settingsSummaryStatus ||
    !settingsSummaryText
  ) {
    return;
  }

  settingsSpeedStatus.textContent = getUpdateSpeedLabel();
  settingsModeStatus.textContent = getSimulationModeLabel();
  settingsLogLimitStatus.textContent = appSettings.logLimit;

  settingsSummaryStatus.textContent = getSimulationModeLabel();

  settingsSummaryText.textContent =
    "Aktualisierung: " +
    getUpdateSpeedLabel() +
    " · Log-Limit: " +
    appSettings.logLimit +
    " Einträge.";

  if (appSettings.simulationMode === "critical") {
    settingsSummaryStatus.className = "metric-critical";
  } else if (appSettings.simulationMode === "calm") {
    settingsSummaryStatus.className = "metric-secure";
  } else {
    settingsSummaryStatus.className = "metric-warning";
  }
}

function refreshPowerLevelFromValues() {
  if (powerStats.gridLoad >= 90 || powerStats.upsBattery <= 45 || !powerStats.generatorReady) {
    powerStats.status = "Kritisch";
    powerStats.level = "critical";
  } else if (powerStats.gridLoad >= 75 || powerStats.upsBattery <= 65) {
    powerStats.status = "Beobachten";
    powerStats.level = "warning";
  } else {
    powerStats.status = "Normal";
    powerStats.level = "secure";
  }
}

function refreshCoolingLevelFromValues() {
  if (coolingStats.roomTemperature >= 32 || coolingStats.coolingPower >= 95) {
    coolingStats.status = "Kritisch";
    coolingStats.level = "critical";
  } else if (
    coolingStats.roomTemperature >= 27 ||
    coolingStats.coolingPower >= 85 ||
    coolingStats.fanSpeed >= 85
  ) {
    coolingStats.status = "Beobachten";
    coolingStats.level = "warning";
  } else {
    coolingStats.status = "Normal";
    coolingStats.level = "secure";
  }
}

function applySettingsModeEffects() {
  if (simulationState.active) {
    return;
  }

  if (appSettings.simulationMode === "calm") {
    networkTraffic.ping = clampValue(networkTraffic.ping, 5, 35);
    networkTraffic.packetLoss = clampValue(networkTraffic.packetLoss, 0, 1);

    if (firewallStats.threatLevel === "critical") {
      firewallStats.threatLevel = "warning";
      firewallStats.securityMode = "Erhöht";
    }

    powerStats.gridLoad = clampValue(powerStats.gridLoad, 35, 78);
    powerStats.upsBattery = clampValue(powerStats.upsBattery, 60, 100);
    powerStats.generatorReady = true;

    coolingStats.roomTemperature = clampValue(coolingStats.roomTemperature, 18, 28);
    coolingStats.coolingPower = clampValue(coolingStats.coolingPower, 35, 88);
    coolingStats.fanSpeed = clampValue(coolingStats.fanSpeed, 30, 88);

    refreshPowerLevelFromValues();
    refreshCoolingLevelFromValues();

    return;
  }

  if (appSettings.simulationMode === "critical") {
    networkTraffic.ping = clampValue(networkTraffic.ping + getRandomChange(6, 16), 5, 150);

    if (Math.random() < 0.45) {
      networkTraffic.packetLoss = clampValue(networkTraffic.packetLoss + getRandomChange(1, 2), 0, 8);
    }

    if (Math.random() < 0.35) {
      firewallStats.threatLevel = "warning";
      firewallStats.securityMode = "Erhöht";
      firewallStats.blockedRequests += getRandomChange(4, 12);
    }

    powerStats.gridLoad = clampValue(powerStats.gridLoad + getRandomChange(4, 9), 35, 98);
    powerStats.upsBattery = clampValue(powerStats.upsBattery - getRandomChange(0, 2), 35, 100);

    coolingStats.roomTemperature = clampValue(coolingStats.roomTemperature + getRandomChange(1, 2), 18, 36);
    coolingStats.coolingPower = clampValue(coolingStats.coolingPower + getRandomChange(2, 6), 35, 100);
    coolingStats.fanSpeed = clampValue(coolingStats.fanSpeed + getRandomChange(2, 6), 30, 100);

    refreshPowerLevelFromValues();
    refreshCoolingLevelFromValues();
  }
}

function startDatacenterTimer() {
  datacenterIntervalId = setInterval(updateDatacenter, appSettings.intervalMs);
}

function restartDatacenterTimer() {
  if (datacenterIntervalId) {
    clearInterval(datacenterIntervalId);
  }

  startDatacenterTimer();
}

function updateSystemStatus() {
  const criticalServers = document.querySelectorAll(".server.critical");
  const warningServers = document.querySelectorAll(".server.warning");

  const systemStatus = document.getElementById("systemStatus");
  const systemStatusText = document.getElementById("systemStatusText");
  const warningCount = document.getElementById("warningCount");
  const warningText = document.getElementById("warningText");

  let networkWarnings = 1;

  if (networkTraffic.ping >= 50) {
    networkWarnings += 1;
  }

  if (networkTraffic.packetLoss >= 1) {
    networkWarnings += 1;
  }

  if (firewallStats.threatLevel === "warning") {
    networkWarnings += 1;
  }

  if (firewallStats.threatLevel === "critical") {
    networkWarnings += 2;
  }

  if (powerStats.level === "warning") {
    networkWarnings += 1;
  }

  if (powerStats.level === "critical") {
    networkWarnings += 2;
  }

  if (coolingStats.level === "warning") {
    networkWarnings += 1;
  }

  if (coolingStats.level === "critical") {
    networkWarnings += 2;
  }

  if (simulationState.active && simulationState.level === "critical") {
    networkWarnings += 2;
  }

  if (simulationState.active && simulationState.level === "warning") {
    networkWarnings += 1;
  }

  if (simulationState.active && !incidentState.acknowledged) {
    networkWarnings += 1;
  }

  const totalWarnings = warningServers.length + criticalServers.length + networkWarnings;

  warningCounter = totalWarnings;
  warningCount.textContent = warningCounter;

  if (
    criticalServers.length > 0 ||
    networkTraffic.ping >= 100 ||
    networkTraffic.packetLoss >= 5 ||
    firewallStats.threatLevel === "critical" ||
    powerStats.level === "critical" ||
    coolingStats.level === "critical" ||
    simulationState.level === "critical"
  ) {
    systemStatus.textContent = "Kritisch";
    systemStatus.className = "metric-critical";
    systemStatusText.textContent = "Mindestens ein kritischer Wert wurde erkannt.";
    warningText.textContent = warningCounter + " aktive Warnmeldungen.";
  } else if (
    warningServers.length > 0 ||
    networkTraffic.ping >= 50 ||
    networkTraffic.packetLoss >= 1 ||
    firewallStats.threatLevel === "warning" ||
    powerStats.level === "warning" ||
    coolingStats.level === "warning" ||
    simulationState.level === "warning"
  ) {
    systemStatus.textContent = "Beobachten";
    systemStatus.className = "metric-warning";
    systemStatusText.textContent = "Einige Systeme, Netzwerk-, Strom- oder Kühlwerte sind auffällig.";
    warningText.textContent = warningCounter + " aktive Warnmeldungen.";
  } else {
    systemStatus.textContent = "Stabil";
    systemStatus.className = "metric-normal";
    systemStatusText.textContent = "Alle kritischen Hauptsysteme laufen normal.";
    warningText.textContent = "Eine Wartungsmeldung ist aktiv.";
  }
}

function checkForWarnings() {
  checkServerWarnings();
  checkNetworkWarnings();
  checkFirewallWarnings();
  checkPowerWarnings();
  checkCoolingWarnings();
  checkSimulationWarnings();
  checkIncidentWarnings();
}

function updateDatacenter() {
  updateLiveServerValues();
  updateNetworkTraffic();
  updateFirewallStats();
  updatePowerStats();
  updateCoolingStats();

  applySettingsModeEffects();
  applySimulationEffects();

  updateServerMetrics();
  applySimulationEffects();

  renderNetworkTraffic();
  renderFirewallStats();
  renderPowerStats();
  renderCoolingStats();
  renderSimulationState();

  syncIncidentManagement();
  renderIncidentManagement();

  updateTrafficCharts();

  calculateDatacenterOverview();
  updateSystemStatus();
  renderSystemReport();
  renderControlBar();
  renderSettingsSummary();

  checkForWarnings();
}

function startApp() {
  loadAppSettings();
  createSettingsPanel();

  if (typeof setLogLimit === "function") {
    setLogLimit(appSettings.logLimit);
  }

  updateClock();

  updateServerMetrics();
  renderNetworkTraffic();
  renderFirewallStats();
  renderPowerStats();
  renderCoolingStats();
  renderSimulationState();

  syncIncidentManagement();
  renderIncidentManagement();

  updateTrafficCharts();
  updateTrafficCharts();
  updateTrafficCharts();

  calculateDatacenterOverview();
  updateSystemStatus();
  renderSystemReport();
  renderControlBar();
  renderSettingsSummary();

  createStartLogEntries();
  setupSimulationButtons();
  setupIncidentButtons();
  setupReportButtons();

  addLogEntry("info", "Firewall-Center geladen.");
  addLogEntry("info", "Bandbreiten-Diagramme gestartet.");
  addLogEntry("info", "Stromversorgung und USV-Monitoring gestartet.");
  addLogEntry("info", "Kühlungssystem gestartet.");
  addLogEntry("info", "Ausfallsimulation bereit.");
  addLogEntry("info", "Incident-Management bereit.");
  addLogEntry("info", "Systembericht bereit.");
  addLogEntry("info", "Mini-Dashboard bereit.");
  addLogEntry("info", "Einstellungen geladen.");
  addLogEntry("info", "Reset-Funktion für Einstellungen bereit.");

  setInterval(updateClock, 1000);
  startDatacenterTimer();
}

startApp();