let powerStats = {
  status: "Normal",
  level: "secure",
  gridLoad: 58,
  upsBattery: 96,
  generatorReady: true
};

function updatePowerStats() {
  powerStats.gridLoad = clampValue(powerStats.gridLoad + getRandomChange(-6, 8), 35, 98);

  const batteryDrain = Math.random() < 0.18;

  if (batteryDrain || powerStats.gridLoad >= 85) {
    powerStats.upsBattery = clampValue(powerStats.upsBattery - getRandomChange(1, 3), 35, 100);
  } else {
    powerStats.upsBattery = clampValue(powerStats.upsBattery + getRandomChange(0, 1), 35, 100);
  }

  const generatorIssue = Math.random() < 0.06;
  powerStats.generatorReady = !generatorIssue;

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

function setProgressBar(barElement, value, type) {
  barElement.style.width = value + "%";
  barElement.classList.remove("secure", "warning", "critical");

  if (type === "battery") {
    if (value <= 45) {
      barElement.classList.add("critical");
    } else if (value <= 65) {
      barElement.classList.add("warning");
    } else {
      barElement.classList.add("secure");
    }
  }

  if (type === "load") {
    if (value >= 90) {
      barElement.classList.add("critical");
    } else if (value >= 75) {
      barElement.classList.add("warning");
    } else {
      barElement.classList.add("secure");
    }
  }
}

function renderPowerStats() {
  const powerStatus = document.getElementById("powerStatus");
  const powerStatusText = document.getElementById("powerStatusText");
  const gridLoad = document.getElementById("gridLoad");
  const upsBattery = document.getElementById("upsBattery");
  const generatorStatus = document.getElementById("generatorStatus");
  const generatorStatusText = document.getElementById("generatorStatusText");
  const gridLoadBar = document.getElementById("gridLoadBar");
  const upsBatteryBar = document.getElementById("upsBatteryBar");

  const powerCards = document.querySelectorAll(".power-card");

  powerCards.forEach(function(card) {
    card.classList.remove("warning", "critical");
  });

  powerStatus.textContent = powerStats.status;
  gridLoad.textContent = powerStats.gridLoad + " %";
  upsBattery.textContent = powerStats.upsBattery + " %";

  setProgressBar(gridLoadBar, powerStats.gridLoad, "load");
  setProgressBar(upsBatteryBar, powerStats.upsBattery, "battery");

  if (powerStats.generatorReady) {
    generatorStatus.textContent = "Bereit";
    generatorStatus.className = "metric-secure";
    generatorStatusText.textContent = "Notstromsystem ist einsatzbereit.";
  } else {
    generatorStatus.textContent = "Störung";
    generatorStatus.className = "metric-critical";
    generatorStatusText.textContent = "Notstromsystem meldet eine Störung.";
    powerCards[3].classList.add("critical");
  }

  if (powerStats.level === "critical") {
    powerStatus.className = "metric-critical";
    powerStatusText.textContent = "Stromversorgung benötigt sofortige Aufmerksamkeit.";
    powerCards[0].classList.add("critical");

    if (powerStats.gridLoad >= 90) {
      powerCards[1].classList.add("critical");
    }

    if (powerStats.upsBattery <= 45) {
      powerCards[2].classList.add("critical");
    }
  } else if (powerStats.level === "warning") {
    powerStatus.className = "metric-warning";
    powerStatusText.textContent = "Stromversorgung zeigt erhöhte Werte.";
    powerCards[0].classList.add("warning");

    if (powerStats.gridLoad >= 75) {
      powerCards[1].classList.add("warning");
    }

    if (powerStats.upsBattery <= 65) {
      powerCards[2].classList.add("warning");
    }
  } else {
    powerStatus.className = "metric-secure";
    powerStatusText.textContent = "Stromversorgung arbeitet normal.";
  }
}

function checkPowerWarnings() {
  let message = "";
  let level = "";

  if (!powerStats.generatorReady) {
    level = "critical";
    message = "Notstromsystem meldet eine Störung.";
  } else if (powerStats.gridLoad >= 90) {
    level = "critical";
    message = "Stromversorgung kritisch: Netzlast " + powerStats.gridLoad + "%";
  } else if (powerStats.upsBattery <= 45) {
    level = "critical";
    message = "USV-Akkustand kritisch: " + powerStats.upsBattery + "%";
  } else if (powerStats.gridLoad >= 75) {
    level = "warning";
    message = "Stromversorgung erhöht: Netzlast " + powerStats.gridLoad + "%";
  } else if (powerStats.upsBattery <= 65) {
    level = "warning";
    message = "USV-Akkustand niedrig: " + powerStats.upsBattery + "%";
  }

  if (message !== "" && !isWarningMessageKnown(message)) {
    addLogEntry(level, message);
    rememberWarningMessage(message);
  }
}