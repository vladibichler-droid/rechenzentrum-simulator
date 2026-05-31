# Changelog

Alle wichtigen Änderungen am Rechenzentrum-Simulator werden hier dokumentiert.

## Version 30 – Finaler Projektstand / Abschluss-Check

Neu:

- Abschluss-Check ergänzt
- Projekt final dokumentiert
- README auf Version 30 aktualisiert
- CHANGELOG auf Version 30 aktualisiert
- neue Datei `ABSCHLUSS-CHECK.md`

Ziel:

- Projekt sauber abschließen
- aktuellen Stand nachvollziehbar machen
- Sicherungspunkt für den finalen Projektstand schaffen

## Version 29 – Projekt-Dokumentation

Neu:

- `README.md`
- `CHANGELOG.md`

Ziel:

- Projekt verständlich beschreiben
- aktuelle Funktionen dokumentieren
- Projektstruktur sichtbar machen
- Versionsverlauf festhalten

## Version 28 – Einstellungen zurücksetzen

Neu:

- Button zum Zurücksetzen der Einstellungen
- Aktualisierung zurück auf Normal
- Simulationsmodus zurück auf Realistisch
- Log-Limit zurück auf 30
- Einstellungen werden gespeichert
- Meldung im Ereignisprotokoll

Geändert:

- `js/main.js`

## Version 27 – Einstellungen / Simulationsmodus

Neu:

- Einstellungen-Bereich
- Aktualisierung langsam / normal / schnell
- Simulationsmodus ruhig / realistisch / kritisch
- Log-Limit 30 / 50 / 100
- Speicherung der Einstellungen im Browser
- automatischer Navigationspunkt Einstellungen

Geändert:

- `js/main.js`
- `js/logs.js`

## Version 26 – Ereignisprotokoll herunterladen

Neu:

- Ereignisprotokoll als TXT-Datei herunterladen
- automatischer Dateiname mit Datum und Uhrzeit
- Export enthält Zeit, Level und Meldung
- Log-Filter bleibt erhalten
- Log-Suche bleibt erhalten

Geändert:

- `js/logs.js`

## Version 25 – Bericht mit Ursachenanalyse

Neu:

- kritische Gründe im Systembericht
- Warnhinweise im Systembericht
- Server-Zusammenfassung
- auffällige Server im Bericht
- genauere Empfehlung
- kritische Serverwerte mit CPU, RAM und Temperatur

Geändert:

- `js/report.js`

## Version 24 – Systembericht herunterladen

Neu:

- Button Bericht herunterladen
- Systembericht als TXT-Datei speichern
- automatischer Dateiname
- Meldung im Ereignisprotokoll

Geändert:

- `index.html`
- `js/report.js`

## Version 23 – Design-Feinschliff

Neu verbessert:

- ruhigeres Dark-Design
- bessere Karten-Hierarchie
- stärker hervorgehobener Leitstand
- schönere Buttons
- bessere Abstände
- klarere Bereiche
- professionellerer Kontrollzentrum-Look

Geändert:

- `style.css`

## Version 22 – Mini-Dashboard / Leitstand

Neu:

- kompakter Leitstand oben
- Systemstatus auf einen Blick
- aktiver Incident sichtbar
- Warnungen sichtbar
- Ping sichtbar
- Stromstatus sichtbar
- Kühlstatus sichtbar
- Live-Aktualisierung

Neu erstellt:

- `js/controlbar.js`

Geändert:

- `index.html`
- `style.css`
- `js/main.js`

## Version 21 – Systembericht / Statusbericht

Neu:

- automatischer Systembericht
- aktueller Systemstatus
- aktiver Incident
- Netzwerkwerte
- Stromstatus
- Kühlstatus
- Empfehlung
- Bericht aktualisieren
- Bericht kopieren

Neu erstellt:

- `js/report.js`

Geändert:

- `index.html`
- `style.css`
- `js/main.js`

## Version 20 – Log-Suche

Neu:

- Suchfeld im Ereignisprotokoll
- Suche nach Begriffen
- Suche funktioniert zusammen mit Filter
- Suche löschen
- Trefferanzeige

Geändert:

- `js/logs.js`

## Version 19 – Log-Filter

Neu:

- Filter Alle
- Filter Info
- Filter Warnungen
- Filter Kritisch
- bessere Übersicht im Ereignisprotokoll

Geändert:

- `js/logs.js`

## Version 18 – Dashboard-Navigation / Bereichsmenü

Neu:

- Bereichsmenü
- Sprunglinks zu Dashboard-Bereichen
- glattes Scrollen
- bessere Navigation innerhalb der App

Geändert:

- `index.html`
- `style.css`

## Version 17 – Incident-Management

Neu:

- Incident-Management-Bereich
- aktiver Incident
- Priorität
- Bearbeitungsstatus
- empfohlene Maßnahme
- Incident übernehmen
- Incident als behoben markieren

Neu erstellt:

- `js/incident.js`

Geändert:

- `index.html`
- `style.css`
- `js/main.js`

## Version 16 – Ausfallsimulation

Neu:

- Ausfallsimulation
- Server-Ausfall simulieren
- Netzwerkstörung simulieren
- Stromproblem simulieren
- Kühlproblem simulieren
- System zurücksetzen
- Simulationseinträge im Ereignisprotokoll

Neu erstellt:

- `js/simulation.js`

Geändert:

- `index.html`
- `style.css`
- `js/main.js`

## Version 15 – Kühlungssystem

Neu:

- Kühlungssystem
- Kühlstatus
- Raumtemperatur
- Kühlleistung
- Lüfterstatus
- Warnungen bei erhöhter Temperatur
- kritische Kühlwerte

Neu erstellt:

- `js/cooling.js`

Geändert:

- `index.html`
- `style.css`
- `js/main.js`

## Version 14 – Stromversorgung / USV

Neu:

- Stromversorgung
- USV-Akkustand
- Netzlast
- Notstromstatus
- Warnungen bei kritischer Stromversorgung

Neu erstellt:

- `js/power.js`

Geändert:

- `index.html`
- `style.css`
- `js/main.js`

## Version 13 – Bandbreiten-Diagramme

Neu:

- Download-Verlauf
- Upload-Verlauf
- Balkendiagramme
- Live-Verlauf der Netzwerkwerte

Neu erstellt:

- `js/charts.js`

Geändert:

- `index.html`
- `style.css`
- `js/main.js`

Hinweis:

- Diese Version wurde nach einem Fehler nochmal sauber mit kompletten Dateien aufgebaut.

## Version 12 – Firewall-Center

Neu:

- Firewall-Center
- Firewall-Status
- blockierte Anfragen
- erlaubte Verbindungen
- Sicherheitsmodus
- Firewall-Warnungen

Neu erstellt:

- `js/firewall.js`

## Version 11 – Projekt aufgeteilt

Neu:

- JavaScript wurde in mehrere Dateien aufgeteilt
- bessere Modulstruktur
- bessere Wartbarkeit

Dateien:

- `js/utils.js`
- `js/logs.js`
- `js/monitoring.js`
- `js/network.js`
- `js/main.js`

## Version 10 – Letzter Stand vor Aufteilung

Stand:

- Rechenzentrum-Simulator lief als größere zusammenhängende App
- Serverracks vorhanden
- Netzwerkwerte vorhanden
- Ereignisprotokoll vorhanden
- Grundfunktionen liefen

## Version 1 bis Version 9 – Grundaufbau

In den ersten Versionen wurde der Grundaufbau erstellt und erweitert.

Dazu gehörten:

- HTML-Grundstruktur
- Dark-Dashboard-Design
- Serverracks
- Serverwerte
- CPU / RAM / Temperatur
- Datacenter-Übersicht
- Netzwerkübersicht
- Download
- Upload
- Ping
- Paketverlust
- Ereignisprotokoll
- erste Live-Aktualisierung

## Aktueller Projektstand

```text
Version 30
Finaler Projektstand / Abschluss-Check
```

## Empfohlene Sicherung

```text
rechenzentrum-simulator-version-30.zip
```