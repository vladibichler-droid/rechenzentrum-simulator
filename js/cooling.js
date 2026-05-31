let coolingStats = {
  status: "Normal",
  level: "secure",
  roomTemperature: 22,
  coolingPower: 58,
  fanSpeed: 46
};

function updateCoolingStats() {
  const heatPressure = Math.random() < 0.28;

  if (heatPressure) {
    coolingStats.roomTemperature = clampValue(coolingStats.roomTemperature + getRandomChange(0, 2), 18, 36);
  } else {
    coolingStats.roomTemperature = clampValue(coolingStats.roomTemperature + getRandomChange(-1, 1), 18, 36);
  }

  if (coolingStats.roomTemperature >= 30) {
    coolingStats.coolingPower = clampValue(coolingStats.coolingPower + getRandomChange(5, 10), 35, 100);
    coolingStats.fanSpeed = clampValue(coolingStats.fanSpeed + getRandomChange(6, 12), 30, 100);
  } else if (coolingStats.roomTemperature >= 26) {
    coolingStats.coolingPower = clampValue(coolingStats.coolingPower + getRandomChange(2, 6), 35, 100);
    coolingStats.fanSpeed = clampValue(coolingStats.fanSpeed + getRandomChange(2, 6), 30, 100);
  } else {
    coolingStats.coolingPower = clampValue(coolingStats.coolingPower + getRandomChange(-4, 3), 35, 100);
    coolingStats.fanSpeed = clampValue(coolingStats.fanSpeed + getRandomChange(-4, 3), 30, 100);
  }

  if (coolingStats.roomTemperature >= 32 || coolingStats.coolingPower >= 95) {
    coolingStats.status = "Kritisch";
    coolingStats.level = "critical";
  } else if (coolingStats.roomTemperature >= 27 || coolingStats.coolingPower >= 85 || coolingStats.fanSpeed >= 85) {
    coolingStats.status = "Beobachten";
    coolingStats.level = "warning";
  } else {
    coolingStats.status = "Normal";
    coolingStats.level = "secure";
  }
}

function setCoolingProgressBar(barElement, value, type) {
  barElement.style.width = value + "%";
  barElement.classList.remove("secure", "warning", "critical", "cooling");

  if (type === "temperature") {
    if (value >= 32) {
      barElement.classList.add("critical");
    } else if (value >= 27) {
      barElement.classList.add("warning");
    } else {
      barElement.classList.add("cooling");
    }
  }

  if (type === "power" || type === "fan") {
    if (value >= 95) {
      barElement.classList.add("critical");
    } else if (value >= 85) {
      barElement.classList.add("warning");
    } else {
      barElement.classList.add("cooling");
    }
  }
}

function renderCoolingStats() {
  const coolingStatus = document.getElementById("coolingStatus");
  const coolingStatusText = document.getElementById("coolingStatusText");
  const roomTemperature = document.getElementById("roomTemperature");
  const coolingPower = document.getElementById("coolingPower");
  const fanSpeed = document.getElementById("fanSpeed");

  const roomTemperatureBar = document.getElementById("roomTemperatureBar");
  const coolingPowerBar = document.getElementById("coolingPowerBar");
  const fanSpeedBar = document.getElementById("fanSpeedBar");

  const coolingCards = document.querySelectorAll(".cooling-card");

  coolingCards.forEach(function(card) {
    card.classList.remove("warning", "critical");
  });

  coolingStatus.textContent = coolingStats.status;
  roomTemperature.textContent = coolingStats.roomTemperature + " °C";
  coolingPower.textContent = coolingStats.coolingPower + " %";
  fanSpeed.textContent = coolingStats.fanSpeed + " %";

  const temperaturePercent = Math.round((coolingStats.roomTemperature / 36) * 100);

  setCoolingProgressBar(roomTemperatureBar, temperaturePercent, "temperature");
  setCoolingProgressBar(coolingPowerBar, coolingStats.coolingPower, "power");
  setCoolingProgressBar(fanSpeedBar, coolingStats.fanSpeed, "fan");

  if (coolingStats.level === "critical") {
    coolingStatus.className = "metric-critical";
    coolingStatusText.textContent = "Kühlung benötigt sofortige Aufmerksamkeit.";
    coolingCards[0].classList.add("critical");

    if (coolingStats.roomTemperature >= 32) {
      coolingCards[1].classList.add("critical");
    }

    if (coolingStats.coolingPower >= 95) {
      coolingCards[2].classList.add("critical");
    }

    if (coolingStats.fanSpeed >= 95) {
      coolingCards[3].classList.add("critical");
    }
  } else if (coolingStats.level === "warning") {
    coolingStatus.className = "metric-warning";
    coolingStatusText.textContent = "Kühlung arbeitet mit erhöhter Leistung.";
    coolingCards[0].classList.add("warning");

    if (coolingStats.roomTemperature >= 27) {
      coolingCards[1].classList.add("warning");
    }

    if (coolingStats.coolingPower >= 85) {
      coolingCards[2].classList.add("warning");
    }

    if (coolingStats.fanSpeed >= 85) {
      coolingCards[3].classList.add("warning");
    }
  } else {
    coolingStatus.className = "metric-secure";
    coolingStatusText.textContent = "Kühlung arbeitet im normalen Bereich.";
  }
}

function checkCoolingWarnings() {
  let message = "";
  let level = "";

  if (coolingStats.roomTemperature >= 32) {
    level = "critical";
    message = "Raumtemperatur kritisch: " + coolingStats.roomTemperature + "°C";
  } else if (coolingStats.coolingPower >= 95) {
    level = "critical";
    message = "Kühlleistung kritisch: " + coolingStats.coolingPower + "%";
  } else if (coolingStats.roomTemperature >= 27) {
    level = "warning";
    message = "Raumtemperatur erhöht: " + coolingStats.roomTemperature + "°C";
  } else if (coolingStats.coolingPower >= 85) {
    level = "warning";
    message = "Kühlleistung erhöht: " + coolingStats.coolingPower + "%";
  } else if (coolingStats.fanSpeed >= 85) {
    level = "warning";
    message = "Lüftergeschwindigkeit erhöht: " + coolingStats.fanSpeed + "%";
  }

  if (message !== "" && !isWarningMessageKnown(message)) {
    addLogEntry(level, message);
    rememberWarningMessage(message);
  }
}