# Rechenzentrum-Simulator

Ein simuliertes Rechenzentrum-Kontrollzentrum als Webprojekt.

Dieses Projekt zeigt ein technisches Dashboard mit Serverracks, Netzwerkübersicht, Firewall-Center, Bandbreiten-Diagrammen, Stromversorgung, Kühlung, Ausfallsimulation, Incident-Management, Systembericht, Ereignisprotokoll und Einstellungen.

## Projektstatus

Version 31  
GitHub-Version

Das Projekt ist als Lernprojekt abgeschlossen und sauber dokumentiert.

## Kurzbeschreibung

Der Rechenzentrum-Simulator ist eine kleine Web-App, die ein technisches Kontrollzentrum nachbildet.

Die angezeigten Werte sind simuliert. Es werden keine echten Serverdaten verwendet.

Das Projekt eignet sich zum Üben von:

- HTML
- CSS
- JavaScript
- modularer Dateistruktur
- Dashboard-Aufbau
- UI-Design
- simulierten Live-Werten
- Exportfunktionen
- Einstellungen mit Speicherung im Browser

## Funktionen

### Leitstand

Der Leitstand zeigt oben wichtige Werte auf einen Blick:

- Systemstatus
- aktiver Incident
- Warnungen
- Ping
- Stromstatus
- Kühlstatus

### Serverracks

Die App zeigt mehrere simulierte Serverracks mit Serverwerten:

- CPU
- RAM
- Temperatur
- Serverstatus
- Wartungszustand

### Netzwerkübersicht

Die Netzwerkübersicht zeigt eine einfache Rechenzentrum-Topologie:

- Internet
- Firewall
- Core Switch
- Rack 01
- Rack 02
- Rack 03
- Backup

Zusätzlich werden Netzwerkwerte simuliert:

- Download
- Upload
- Ping
- Paketverlust

### Firewall-Center

Das Firewall-Center zeigt simulierte Sicherheitswerte:

- Firewall-Status
- blockierte Anfragen
- erlaubte Verbindungen
- Sicherheitsmodus

### Bandbreiten-Diagramme

Die App zeigt einfache Live-Diagramme für:

- Download-Verlauf
- Upload-Verlauf

### Stromversorgung / USV

Der Strombereich zeigt:

- Stromstatus
- Netzlast
- USV-Akkustand
- Notstromstatus

### Kühlungssystem

Der Kühlungsbereich zeigt:

- Kühlstatus
- Raumtemperatur
- Kühlleistung
- Lüfterstatus

### Ausfallsimulation

Es können verschiedene Vorfälle simuliert werden:

- Server-Ausfall
- Netzwerkstörung
- Stromproblem
- Kühlproblem

Außerdem kann die Simulation zurückgesetzt werden.

### Incident-Management

Bei aktiven Vorfällen zeigt die App:

- aktiven Incident
- Priorität
- Bearbeitungsstatus
- empfohlene Maßnahme
- zuständiges Team

Aktionen:

- Incident übernehmen
- Incident als behoben markieren

### Systembericht

Die App kann einen Systembericht erstellen.

Der Bericht enthält:

- Systemstatus
- aktiven Incident
- Ursachenanalyse
- kritische Gründe
- Warnhinweise
- Server-Zusammenfassung
- auffällige Server
- Netzwerkwerte
- Firewallwerte
- Stromwerte
- Kühlwerte
- Empfehlung

Der Bericht kann:

- aktualisiert werden
- kopiert werden
- als TXT-Datei heruntergeladen werden

### Ereignisprotokoll

Das Ereignisprotokoll unterstützt:

- Log-Einträge anzeigen
- Filter nach Info
- Filter nach Warnungen
- Filter nach Kritisch
- Suche im Ereignisprotokoll
- Suche löschen
- Export als TXT-Datei

### Einstellungen

Im Einstellungen-Bereich kann angepasst werden:

- Aktualisierung: langsam / normal / schnell
- Simulationsmodus: ruhig / realistisch / kritisch
- Log-Limit: 30 / 50 / 100
- Einstellungen zurücksetzen

Die Einstellungen werden im Browser gespeichert.

## Verwendete Technologien

- HTML
- CSS
- JavaScript
- LocalStorage
- Browser Blob API

Es werden keine externen Frameworks verwendet.

Das Projekt läuft direkt im Browser.

## Projektstruktur

```text
rechenzentrum-simulator/
├── index.html
├── style.css
├── README.md
├── CHANGELOG.md
├── ABSCHLUSS-CHECK.md
├── .gitignore
└── js/
    ├── utils.js
    ├── logs.js
    ├── monitoring.js
    ├── network.js
    ├── firewall.js
    ├── charts.js
    ├── power.js
    ├── cooling.js
    ├── simulation.js
    ├── incident.js
    ├── report.js
    ├── controlbar.js
    └── main.js
```

## Starten des Projekts

### Variante 1: Direkt öffnen

Die Datei `index.html` kann direkt im Browser geöffnet werden.

### Variante 2: Mit Live Server

Empfohlen für VS Code:

1. Projektordner in VS Code öffnen
2. `index.html` öffnen
3. Mit Live Server starten
4. Dashboard im Browser verwenden

## Wichtiger Hinweis

Dieses Projekt verwendet keine echten Serverdaten.

Alle Werte, Warnungen und Vorfälle sind simuliert und dienen nur zum Lernen, Testen und Verstehen eines technischen Kontrollzentrums.

## Lernziel

Das Projekt wurde Schritt für Schritt aufgebaut.

Dabei wurde geübt:

- kleine Versionen bauen
- Funktionen einzeln erweitern
- Dateien sauber aufteilen
- Code modular strukturieren
- Oberfläche verbessern
- Projekt dokumentieren
- Exportfunktionen einbauen
- Einstellungen speichern
- ein Projekt sauber abschließen

## Aktueller Stand

Finaler Projektstand erreicht.  
GitHub-Version erstellt.

## Empfohlene Sicherung

```text
rechenzentrum-simulator-version-31-github.zip
```

## Autor

Erstellt und schrittweise erweitert von Vladislav Bichler.