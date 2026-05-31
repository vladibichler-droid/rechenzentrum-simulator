let warningCounter = 1;
let lastWarningMessages = [];
let currentLogFilter = "all";
let currentLogSearch = "";
let currentLogLimit = 30;

function createLogFilterControls() {
  const eventLog = document.getElementById("eventLog");

  if (!eventLog) {
    return;
  }

  const existingControls = document.getElementById("logFilterControls");

  if (existingControls) {
    return;
  }

  const wrapper = document.createElement("div");
  wrapper.id = "logFilterControls";
  wrapper.style.display = "grid";
  wrapper.style.gap = "12px";
  wrapper.style.marginBottom = "14px";

  const searchRow = document.createElement("div");
  searchRow.style.display = "grid";
  searchRow.style.gridTemplateColumns = "1fr auto";
  searchRow.style.gap = "10px";

  const searchInput = document.createElement("input");
  searchInput.id = "logSearchInput";
  searchInput.type = "search";
  searchInput.placeholder = "Suche im Ereignisprotokoll...";
  searchInput.style.width = "100%";
  searchInput.style.padding = "12px 14px";
  searchInput.style.color = "#dbeafe";
  searchInput.style.background = "#06101d";
  searchInput.style.border = "1px solid #29486f";
  searchInput.style.borderRadius = "12px";
  searchInput.style.fontSize = "14px";
  searchInput.style.outline = "none";

  searchInput.addEventListener("input", function() {
    currentLogSearch = searchInput.value.trim().toLowerCase();
    applyLogFilter();
    updateLogSearchInfo();
  });

  const clearSearchButton = document.createElement("button");
  clearSearchButton.type = "button";
  clearSearchButton.textContent = "Suche löschen";
  clearSearchButton.style.padding = "12px 14px";
  clearSearchButton.style.cursor = "pointer";
  clearSearchButton.style.color = "#dbeafe";
  clearSearchButton.style.background = "#13243b";
  clearSearchButton.style.border = "1px solid #29486f";
  clearSearchButton.style.borderRadius = "12px";
  clearSearchButton.style.fontWeight = "800";

  clearSearchButton.addEventListener("click", function() {
    searchInput.value = "";
    currentLogSearch = "";
    applyLogFilter();
    updateLogSearchInfo();
  });

  searchRow.appendChild(searchInput);
  searchRow.appendChild(clearSearchButton);

  const buttonRow = document.createElement("div");
  buttonRow.style.display = "grid";
  buttonRow.style.gridTemplateColumns = "repeat(4, 1fr)";
  buttonRow.style.gap = "10px";

  const filters = [
    {
      label: "Alle",
      value: "all"
    },
    {
      label: "Info",
      value: "info"
    },
    {
      label: "Warnungen",
      value: "warning"
    },
    {
      label: "Kritisch",
      value: "critical"
    }
  ];

  filters.forEach(function(filter) {
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = filter.label;
    button.dataset.filter = filter.value;

    button.style.padding = "11px 12px";
    button.style.cursor = "pointer";
    button.style.color = "#dbeafe";
    button.style.background = "#13243b";
    button.style.border = "1px solid #29486f";
    button.style.borderRadius = "12px";
    button.style.fontWeight = "800";

    button.addEventListener("click", function() {
      setLogFilter(filter.value);
    });

    buttonRow.appendChild(button);
  });

  const exportRow = document.createElement("div");
  exportRow.style.display = "grid";
  exportRow.style.gridTemplateColumns = "1fr";
  exportRow.style.gap = "10px";

  const downloadLogButton = document.createElement("button");
  downloadLogButton.id = "downloadLogBtn";
  downloadLogButton.type = "button";
  downloadLogButton.textContent = "Ereignisprotokoll herunterladen";
  downloadLogButton.style.padding = "12px 14px";
  downloadLogButton.style.cursor = "pointer";
  downloadLogButton.style.color = "#bbf7d0";
  downloadLogButton.style.background = "rgba(20, 83, 45, 0.24)";
  downloadLogButton.style.border = "1px solid rgba(34, 197, 94, 0.45)";
  downloadLogButton.style.borderRadius = "12px";
  downloadLogButton.style.fontWeight = "800";
  downloadLogButton.style.textAlign = "left";

  downloadLogButton.addEventListener("click", function() {
    downloadEventLog();
  });

  exportRow.appendChild(downloadLogButton);

  const searchInfo = document.createElement("p");
  searchInfo.id = "logSearchInfo";
  searchInfo.style.margin = "0";
  searchInfo.style.color = "#94a3b8";
  searchInfo.style.fontSize = "13px";
  searchInfo.textContent = "Alle Log-Einträge werden angezeigt.";

  wrapper.appendChild(searchRow);
  wrapper.appendChild(buttonRow);
  wrapper.appendChild(exportRow);
  wrapper.appendChild(searchInfo);

  eventLog.parentElement.insertBefore(wrapper, eventLog);

  updateLogFilterButtons();
  updateLogSearchInfo();
}

function setLogLimit(limit) {
  currentLogLimit = Number(limit);

  if (!currentLogLimit || currentLogLimit < 1) {
    currentLogLimit = 30;
  }

  trimEventLogToLimit();
  updateLogSearchInfo();
}

function trimEventLogToLimit() {
  const eventLog = document.getElementById("eventLog");

  if (!eventLog) {
    return;
  }

  while (eventLog.children.length > currentLogLimit) {
    eventLog.removeChild(eventLog.lastElementChild);
  }
}

function setLogFilter(filter) {
  currentLogFilter = filter;
  updateLogFilterButtons();
  applyLogFilter();
  updateLogSearchInfo();
}

function updateLogFilterButtons() {
  const controls = document.getElementById("logFilterControls");

  if (!controls) {
    return;
  }

  const buttons = controls.querySelectorAll("button[data-filter]");

  buttons.forEach(function(button) {
    const isActive = button.dataset.filter === currentLogFilter;

    if (isActive) {
      button.style.background = "#0ea5e9";
      button.style.borderColor = "#38bdf8";
      button.style.color = "#ffffff";
    } else {
      button.style.background = "#13243b";
      button.style.borderColor = "#29486f";
      button.style.color = "#dbeafe";
    }
  });
}

function getVisibleLogCount() {
  const eventLog = document.getElementById("eventLog");

  if (!eventLog) {
    return 0;
  }

  const entries = eventLog.querySelectorAll(".log-entry");
  let visibleCount = 0;

  entries.forEach(function(entry) {
    if (entry.style.display !== "none") {
      visibleCount += 1;
    }
  });

  return visibleCount;
}

function updateLogSearchInfo() {
  const searchInfo = document.getElementById("logSearchInfo");

  if (!searchInfo) {
    return;
  }

  const visibleCount = getVisibleLogCount();

  let filterText = "Alle";

  if (currentLogFilter === "info") {
    filterText = "Info";
  }

  if (currentLogFilter === "warning") {
    filterText = "Warnungen";
  }

  if (currentLogFilter === "critical") {
    filterText = "Kritisch";
  }

  if (currentLogSearch === "") {
    searchInfo.textContent =
      visibleCount +
      " Log-Einträge sichtbar. Filter: " +
      filterText +
      ". Limit: " +
      currentLogLimit +
      ".";
  } else {
    searchInfo.textContent =
      visibleCount +
      " Treffer sichtbar. Filter: " +
      filterText +
      ". Suche: \"" +
      currentLogSearch +
      "\". Limit: " +
      currentLogLimit +
      ".";
  }
}

function logEntryMatchesSearch(entry) {
  if (currentLogSearch === "") {
    return true;
  }

  const text = entry.textContent.toLowerCase();

  return text.includes(currentLogSearch);
}

function logEntryMatchesFilter(entry) {
  const entryLevel = entry.dataset.level;

  if (currentLogFilter === "all") {
    return true;
  }

  return entryLevel === currentLogFilter;
}

function applyLogFilter() {
  const eventLog = document.getElementById("eventLog");

  if (!eventLog) {
    return;
  }

  const entries = eventLog.querySelectorAll(".log-entry");

  entries.forEach(function(entry) {
    const matchesFilter = logEntryMatchesFilter(entry);
    const matchesSearch = logEntryMatchesSearch(entry);

    if (matchesFilter && matchesSearch) {
      entry.style.display = "grid";
    } else {
      entry.style.display = "none";
    }
  });

  updateLogSearchInfo();
}

function addLogEntry(level, message) {
  const eventLog = document.getElementById("eventLog");

  if (!eventLog) {
    return;
  }

  const entry = document.createElement("div");
  entry.className = "log-entry";
  entry.dataset.level = level;

  const time = document.createElement("span");
  time.className = "log-time";
  time.textContent = getCurrentTime();

  const levelElement = document.createElement("span");
  levelElement.className = "log-level " + level;
  levelElement.textContent = level;

  const messageElement = document.createElement("span");
  messageElement.className = "log-message";
  messageElement.textContent = message;

  entry.appendChild(time);
  entry.appendChild(levelElement);
  entry.appendChild(messageElement);

  eventLog.prepend(entry);

  trimEventLogToLimit();
  applyLogFilter();
}

function createStartLogEntries() {
  addLogEntry("info", "WEB-01 gestartet und erreichbar.");
  addLogEntry("info", "APP-02 verbunden.");
  addLogEntry("warning", "DB-01 zeigt erhöhte RAM-Auslastung.");
  addLogEntry("info", "Netzwerk-Traffic-Monitor gestartet.");
  addLogEntry("info", "Firewall arbeitet im geschützten Modus.");
  addLogEntry("info", "Rack 03 befindet sich im Wartungsmodus.");
}

function rememberWarningMessage(message) {
  lastWarningMessages.push(message);

  if (lastWarningMessages.length > 12) {
    lastWarningMessages.shift();
  }
}

function isWarningMessageKnown(message) {
  return lastWarningMessages.includes(message);
}

function getLogFileName() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");

  return "ereignisprotokoll-rechenzentrum-" + year + "-" + month + "-" + day + "-" + hour + "-" + minute + ".txt";
}

function buildEventLogText() {
  const eventLog = document.getElementById("eventLog");

  if (!eventLog) {
    return "EREIGNISPROTOKOLL RECHENZENTRUM\n===============================\n\nKeine Log-Daten vorhanden.\n";
  }

  const entries = Array.from(eventLog.querySelectorAll(".log-entry"));

  let text = "";

  text += "EREIGNISPROTOKOLL RECHENZENTRUM\n";
  text += "===============================\n\n";
  text += "Exportzeit: " + getCurrentTime() + "\n";
  text += "Einträge: " + entries.length + "\n";
  text += "Log-Limit: " + currentLogLimit + "\n\n";

  if (entries.length === 0) {
    text += "Keine Log-Einträge vorhanden.\n";
    return text;
  }

  entries.forEach(function(entry, index) {
    const time = entry.querySelector(".log-time") ? entry.querySelector(".log-time").textContent : "--:--:--";
    const level = entry.querySelector(".log-level") ? entry.querySelector(".log-level").textContent : "unknown";
    const message = entry.querySelector(".log-message") ? entry.querySelector(".log-message").textContent : "";

    text += index + 1 + ". ";
    text += "[" + time + "] ";
    text += level.toUpperCase() + " - ";
    text += message + "\n";
  });

  return text;
}

function downloadEventLog() {
  const logText = buildEventLogText();
  const fileName = getLogFileName();

  const blob = new Blob([logText], {
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

  addLogEntry("info", "Ereignisprotokoll wurde als TXT-Datei heruntergeladen.");
}

createLogFilterControls();