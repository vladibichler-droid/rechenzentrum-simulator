# Abschluss-Check – Rechenzentrum-Simulator

Projektstand:

Version 30  
Finaler Projektstand / Abschluss-Check

## 1. Dateien prüfen

Diese Dateien sollten im Hauptordner liegen:

```text
index.html
style.css
README.md
CHANGELOG.md
ABSCHLUSS-CHECK.md
```

Diese Dateien sollten im Ordner `js` liegen:

```text
utils.js
logs.js
monitoring.js
network.js
firewall.js
charts.js
power.js
cooling.js
simulation.js
incident.js
report.js
controlbar.js
main.js
```

## 2. Script-Reihenfolge prüfen

Am Ende der `index.html` sollte die Reihenfolge so sein:

```text
js/utils.js
js/logs.js
js/monitoring.js
js/network.js
js/firewall.js
js/charts.js
js/power.js
js/cooling.js
js/simulation.js
js/incident.js
js/report.js
js/controlbar.js
js/main.js
```

## 3. Sichtprüfung in der App

Beim Start der App sollten sichtbar sein:

- Rechenzentrum-Simulator Titel
- Systemzeit
- Leitstand
- Bereichsmenü
- Statuskarten
- Datacenter-Übersicht
- Netzwerkübersicht
- Firewall-Center
- Bandbreiten-Diagramme
- Stromversorgung / USV
- Kühlungssystem
- Ausfallsimulation
- Incident-Management
- Systembericht
- Serverracks
- Ereignisprotokoll
- Einstellungen

## 4. Navigation prüfen

Im Bereichsmenü sollten die Sprunglinks funktionieren:

- Leitstand
- Status
- Übersicht
- Netzwerk
- Firewall
- Diagramme
- Strom
- Kühlung
- Simulation
- Incident
- Bericht
- Racks
- Logs
- Einstellungen

## 5. Simulation prüfen

Diese Buttons sollten funktionieren:

- Server-Ausfall
- Netzwerkstörung
- Stromproblem
- Kühlproblem
- Zurücksetzen

Nach einer Simulation sollte sich der Systemstatus ändern.

## 6. Incident-Management prüfen

Bei aktiver Simulation sollte das Incident-Management reagieren.

Prüfen:

- aktiver Incident wird angezeigt
- Priorität wird angezeigt
- empfohlene Maßnahme wird angezeigt
- Incident übernehmen funktioniert
- als behoben markieren funktioniert

## 7. Systembericht prüfen

Im Systembericht prüfen:

- Bericht aktualisieren funktioniert
- Bericht kopieren funktioniert
- Bericht herunterladen funktioniert
- Ursachenanalyse wird angezeigt
- kritische Gründe werden angezeigt
- Warnhinweise werden angezeigt
- Server-Zusammenfassung wird angezeigt

## 8. Ereignisprotokoll prüfen

Im Ereignisprotokoll prüfen:

- Log-Einträge werden angezeigt
- Filter Alle funktioniert
- Filter Info funktioniert
- Filter Warnungen funktioniert
- Filter Kritisch funktioniert
- Suche funktioniert
- Suche löschen funktioniert
- Ereignisprotokoll herunterladen funktioniert

## 9. Einstellungen prüfen

Im Einstellungen-Bereich prüfen:

- Aktualisierung langsam
- Aktualisierung normal
- Aktualisierung schnell
- Simulationsmodus ruhig
- Simulationsmodus realistisch
- Simulationsmodus kritisch
- Log-Limit 30
- Log-Limit 50
- Log-Limit 100
- Einstellungen zurücksetzen

## 10. Bekannte Besonderheit

Rack 03 befindet sich absichtlich im Wartungsmodus.

Deshalb zeigen `TEST-01` und `TEST-02` keine normalen Live-Werte.

Das ist kein Fehler.

## 11. Sicherung

Empfohlener Dateiname:

```text
rechenzentrum-simulator-version-30.zip
```

Empfohlene Finder-Etiketten:

```text
Grün = Guter Stand
Blau = Sicherheitskopie
```

## 12. Abschlussbewertung

Das Projekt ist als Lernprojekt vollständig nutzbar.

Status:

```text
Finaler Projektstand erreicht
```