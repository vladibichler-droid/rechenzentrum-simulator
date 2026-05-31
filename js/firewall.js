let firewallStats = {
  blockedRequests: 18,
  allowedConnections: 246,
  securityMode: "Normal",
  threatLevel: "secure"
};

function updateFirewallStats() {
  const blockedChange = getRandomChange(0, 8);
  const allowedChange = getRandomChange(5, 28);

  firewallStats.blockedRequests += blockedChange;
  firewallStats.allowedConnections += allowedChange;

  const attackSpike = Math.random() < 0.14;
  const criticalSpike = Math.random() < 0.06;

  if (criticalSpike) {
    firewallStats.blockedRequests += getRandomChange(18, 35);
    firewallStats.securityMode = "Streng";
    firewallStats.threatLevel = "critical";
  } else if (attackSpike || blockedChange >= 6) {
    firewallStats.securityMode = "Erhöht";
    firewallStats.threatLevel = "warning";
  } else {
    firewallStats.securityMode = "Normal";
    firewallStats.threatLevel = "secure";
  }
}

function renderFirewallStats() {
  const firewallStatus = document.getElementById("firewallStatus");
  const firewallStatusText = document.getElementById("firewallStatusText");
  const blockedRequests = document.getElementById("blockedRequests");
  const allowedConnections = document.getElementById("allowedConnections");
  const securityMode = document.getElementById("securityMode");

  const firewallCards = document.querySelectorAll(".firewall-card");

  firewallCards.forEach(function(card) {
    card.classList.remove("warning", "critical");
  });

  blockedRequests.textContent = firewallStats.blockedRequests;
  allowedConnections.textContent = firewallStats.allowedConnections;
  securityMode.textContent = firewallStats.securityMode;

  if (firewallStats.threatLevel === "critical") {
    firewallStatus.textContent = "Kritisch";
    firewallStatus.className = "metric-critical";
    firewallStatusText.textContent = "Ungewöhnlich viele Anfragen wurden blockiert.";
    firewallCards[0].classList.add("critical");
    firewallCards[1].classList.add("critical");
  } else if (firewallStats.threatLevel === "warning") {
    firewallStatus.textContent = "Beobachten";
    firewallStatus.className = "metric-warning";
    firewallStatusText.textContent = "Erhöhte Aktivität an der Firewall.";
    firewallCards[0].classList.add("warning");
    firewallCards[1].classList.add("warning");
  } else {
    firewallStatus.textContent = "Geschützt";
    firewallStatus.className = "metric-secure";
    firewallStatusText.textContent = "Firewall arbeitet im normalen Schutzmodus.";
  }
}

function checkFirewallWarnings() {
  let message = "";
  let level = "";

  if (firewallStats.threatLevel === "critical") {
    level = "critical";
    message = "Firewall blockiert ungewöhnlich viele Anfragen.";
  } else if (firewallStats.threatLevel === "warning") {
    level = "warning";
    message = "Firewall meldet erhöhte Netzwerkaktivität.";
  }

  if (message !== "" && !isWarningMessageKnown(message)) {
    addLogEntry(level, message);
    rememberWarningMessage(message);
  }
}