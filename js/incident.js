let incidentState = {
  title: "Keiner",
  summary: "Kein aktiver Vorfall.",
  priority: "Normal",
  priorityText: "Keine besondere Priorität.",
  workflow: "Kein Ticket",
  workflowText: "Es ist kein Incident geöffnet.",
  recommendation: "Keine",
  owner: "Zuständigkeit: nicht zugewiesen",
  acknowledged: false,
  resolved: true,
  level: "secure"
};

function getIncidentDetailsForSimulation() {
  if (!simulationState.active) {
    return {
      title: "Keiner",
      summary: "Kein aktiver Vorfall.",
      priority: "Normal",
      priorityText: "Keine besondere Priorität.",
      workflow: "Kein Ticket",
      workflowText: "Es ist kein Incident geöffnet.",
      recommendation: "Keine",
      owner: "Zuständigkeit: nicht zugewiesen",
      level: "secure",
      resolved: true
    };
  }

  if (simulationState.type === "server") {
    return {
      title: "Server-Ausfall",
      summary: simulationState.impact,
      priority: "Kritisch",
      priorityText: "Ein produktiver Server ist offline.",
      workflow: incidentState.acknowledged ? "Übernommen" : "Offen",
      workflowText: incidentState.acknowledged
        ? "Incident wurde übernommen und wird bearbeitet."
        : "Incident muss noch übernommen werden.",
      recommendation: "Server prüfen",
      owner: "Zuständigkeit: Server-Team",
      level: "critical",
      resolved: false
    };
  }

  if (simulationState.type === "network") {
    return {
      title: "Netzwerkstörung",
      summary: simulationState.impact,
      priority: "Kritisch",
      priorityText: "Netzwerkqualität ist stark beeinträchtigt.",
      workflow: incidentState.acknowledged ? "Übernommen" : "Offen",
      workflowText: incidentState.acknowledged
        ? "Incident wurde übernommen und wird bearbeitet."
        : "Incident muss noch übernommen werden.",
      recommendation: "Firewall, Switch und Leitung prüfen",
      owner: "Zuständigkeit: Netzwerk-Team",
      level: "critical",
      resolved: false
    };
  }

  if (simulationState.type === "power") {
    return {
      title: "Stromproblem",
      summary: simulationState.impact,
      priority: "Kritisch",
      priorityText: "Stromversorgung oder USV ist gefährdet.",
      workflow: incidentState.acknowledged ? "Übernommen" : "Offen",
      workflowText: incidentState.acknowledged
        ? "Incident wurde übernommen und wird bearbeitet."
        : "Incident muss noch übernommen werden.",
      recommendation: "USV und Notstrom prüfen",
      owner: "Zuständigkeit: Infrastruktur-Team",
      level: "critical",
      resolved: false
    };
  }

  if (simulationState.type === "cooling") {
    return {
      title: "Kühlproblem",
      summary: simulationState.impact,
      priority: "Kritisch",
      priorityText: "Temperatur oder Kühlleistung ist kritisch.",
      workflow: incidentState.acknowledged ? "Übernommen" : "Offen",
      workflowText: incidentState.acknowledged
        ? "Incident wurde übernommen und wird bearbeitet."
        : "Incident muss noch übernommen werden.",
      recommendation: "Klimaanlage und Lüfter prüfen",
      owner: "Zuständigkeit: Facility-Team",
      level: "critical",
      resolved: false
    };
  }

  return {
    title: "Unbekannter Vorfall",
    summary: "Ein unbekannter Incident ist aktiv.",
    priority: "Beobachten",
    priorityText: "Vorfall sollte geprüft werden.",
    workflow: incidentState.acknowledged ? "Übernommen" : "Offen",
    workflowText: incidentState.acknowledged
      ? "Incident wurde übernommen und wird bearbeitet."
      : "Incident muss noch übernommen werden.",
    recommendation: "Systemanalyse durchführen",
    owner: "Zuständigkeit: Leitstelle",
    level: "warning",
    resolved: false
  };
}

function syncIncidentManagement() {
  const details = getIncidentDetailsForSimulation();

  incidentState.title = details.title;
  incidentState.summary = details.summary;
  incidentState.priority = details.priority;
  incidentState.priorityText = details.priorityText;
  incidentState.workflow = details.workflow;
  incidentState.workflowText = details.workflowText;
  incidentState.recommendation = details.recommendation;
  incidentState.owner = details.owner;
  incidentState.level = details.level;
  incidentState.resolved = details.resolved;

  if (!simulationState.active) {
    incidentState.acknowledged = false;
  }
}

function renderIncidentManagement() {
  const incidentTitle = document.getElementById("incidentTitle");
  const incidentSummary = document.getElementById("incidentSummary");
  const incidentPriority = document.getElementById("incidentPriority");
  const incidentPriorityText = document.getElementById("incidentPriorityText");
  const incidentWorkflow = document.getElementById("incidentWorkflow");
  const incidentWorkflowText = document.getElementById("incidentWorkflowText");
  const incidentRecommendation = document.getElementById("incidentRecommendation");
  const incidentOwner = document.getElementById("incidentOwner");

  const incidentCards = document.querySelectorAll(".incident-card");

  incidentCards.forEach(function(card) {
    card.classList.remove("warning", "critical");
  });

  incidentTitle.textContent = incidentState.title;
  incidentSummary.textContent = incidentState.summary;
  incidentPriority.textContent = incidentState.priority;
  incidentPriorityText.textContent = incidentState.priorityText;
  incidentWorkflow.textContent = incidentState.workflow;
  incidentWorkflowText.textContent = incidentState.workflowText;
  incidentRecommendation.textContent = incidentState.recommendation;
  incidentOwner.textContent = incidentState.owner;

  if (incidentState.level === "critical") {
    incidentTitle.className = "metric-critical";
    incidentPriority.className = "metric-critical";
    incidentWorkflow.className = incidentState.acknowledged ? "metric-warning" : "metric-critical";
    incidentRecommendation.className = "metric-warning";

    incidentCards[0].classList.add("critical");
    incidentCards[1].classList.add("critical");

    if (!incidentState.acknowledged) {
      incidentCards[2].classList.add("critical");
    } else {
      incidentCards[2].classList.add("warning");
    }

    incidentCards[3].classList.add("warning");
  } else if (incidentState.level === "warning") {
    incidentTitle.className = "metric-warning";
    incidentPriority.className = "metric-warning";
    incidentWorkflow.className = "metric-warning";
    incidentRecommendation.className = "metric-warning";

    incidentCards[0].classList.add("warning");
    incidentCards[1].classList.add("warning");
  } else {
    incidentTitle.className = "metric-secure";
    incidentPriority.className = "metric-secure";
    incidentWorkflow.className = "metric-secure";
    incidentRecommendation.className = "metric-secure";
  }
}

function acknowledgeIncident() {
  if (!simulationState.active) {
    addLogEntry("info", "Kein aktiver Incident zum Übernehmen vorhanden.");
    return;
  }

  incidentState.acknowledged = true;
  syncIncidentManagement();
  renderIncidentManagement();

  addLogEntry("info", "Incident übernommen: " + incidentState.title + ".");
}

function resolveIncident() {
  if (!simulationState.active) {
    addLogEntry("info", "Kein aktiver Incident zum Abschließen vorhanden.");
    return;
  }

  const resolvedTitle = incidentState.title;

  resetSimulation();

  incidentState.acknowledged = false;
  syncIncidentManagement();
  renderIncidentManagement();

  addLogEntry("info", "Incident behoben: " + resolvedTitle + ".");
}

function checkIncidentWarnings() {
  if (!simulationState.active) {
    return;
  }

  if (!incidentState.acknowledged) {
    const message = "Incident offen: " + incidentState.title + ".";

    if (!isWarningMessageKnown(message)) {
      addLogEntry("warning", message);
      rememberWarningMessage(message);
    }
  }
}

function setupIncidentButtons() {
  document
    .getElementById("acknowledgeIncidentBtn")
    .addEventListener("click", acknowledgeIncident);

  document
    .getElementById("resolveIncidentBtn")
    .addEventListener("click", resolveIncident);
}