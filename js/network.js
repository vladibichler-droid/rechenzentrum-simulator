let networkTraffic = {
  download: 842,
  upload: 214,
  ping: 8,
  packetLoss: 0
};

function updateNetworkTraffic() {
  networkTraffic.download = clampValue(networkTraffic.download + getRandomChange(-90, 110), 200, 1200);
  networkTraffic.upload = clampValue(networkTraffic.upload + getRandomChange(-35, 45), 50, 500);

  const pingSpike = Math.random() < 0.12;
  const lossSpike = Math.random() < 0.10;

  if (pingSpike) {
    networkTraffic.ping = clampValue(networkTraffic.ping + getRandomChange(30, 90), 5, 160);
  } else {
    networkTraffic.ping = clampValue(networkTraffic.ping + getRandomChange(-12, 8), 5, 80);
  }

  if (lossSpike) {
    networkTraffic.packetLoss = clampValue(networkTraffic.packetLoss + getRandomChange(1, 4), 0, 8);
  } else {
    networkTraffic.packetLoss = clampValue(networkTraffic.packetLoss + getRandomChange(-2, 1), 0, 4);
  }
}

function renderNetworkTraffic() {
  const downloadElement = document.getElementById("downloadTraffic");
  const uploadElement = document.getElementById("uploadTraffic");
  const pingElement = document.getElementById("pingValue");
  const packetLossElement = document.getElementById("packetLoss");

  downloadElement.textContent = networkTraffic.download + " Mbit/s";
  uploadElement.textContent = networkTraffic.upload + " Mbit/s";
  pingElement.textContent = networkTraffic.ping + " ms";
  packetLossElement.textContent = networkTraffic.packetLoss + " %";

  downloadElement.className = "metric-normal";
  uploadElement.className = "metric-normal";
  pingElement.className = getMetricClass("ping", networkTraffic.ping);
  packetLossElement.className = getMetricClass("packetLoss", networkTraffic.packetLoss);
}

function checkNetworkWarnings() {
  let message = "";
  let level = "";

  if (networkTraffic.ping >= 100) {
    level = "critical";
    message = "Ping kritisch: " + networkTraffic.ping + " ms";
  } else if (networkTraffic.packetLoss >= 5) {
    level = "critical";
    message = "Paketverlust kritisch: " + networkTraffic.packetLoss + "%";
  } else if (networkTraffic.ping >= 50) {
    level = "warning";
    message = "Ping erhöht: " + networkTraffic.ping + " ms";
  } else if (networkTraffic.packetLoss >= 1) {
    level = "warning";
    message = "Paketverlust erkannt: " + networkTraffic.packetLoss + "%";
  }

  if (message !== "" && !isWarningMessageKnown(message)) {
    addLogEntry(level, message);
    rememberWarningMessage(message);
  }
}