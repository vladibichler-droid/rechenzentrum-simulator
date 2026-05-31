function updateClock() {
  const clockElement = document.getElementById("clock");

  const now = new Date();

  const time = now.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  clockElement.textContent = time;
}

function getCurrentTime() {
  const now = new Date();

  return now.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

function clampValue(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getRandomChange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getMetricClass(type, value) {
  if (type === "cpu" || type === "ram") {
    if (value >= 80) {
      return "metric-critical";
    }

    if (value >= 60) {
      return "metric-warning";
    }

    return "metric-normal";
  }

  if (type === "temp") {
    if (value >= 55) {
      return "metric-critical";
    }

    if (value >= 45) {
      return "metric-warning";
    }

    return "metric-normal";
  }

  if (type === "ping") {
    if (value >= 100) {
      return "metric-critical";
    }

    if (value >= 50) {
      return "metric-warning";
    }

    return "metric-normal";
  }

  if (type === "packetLoss") {
    if (value >= 5) {
      return "metric-critical";
    }

    if (value >= 1) {
      return "metric-warning";
    }

    return "metric-normal";
  }

  return "metric-normal";
}