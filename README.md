# TafelskiElenaLB-183

## Einleitung
Dieses ePortfolio dient dazu, meine Kompetenzen im Modul 183, Applikationssicherheit implementieren, nachzuweisen. Es ist in die fünf Handlungsziele eingeteilt.

## Handlungsziel 1
**Aktuelle Bedrohungen erkennen und erläutern können. Aktuelle Informationen zum Thema (Erkennung und Gegenmassnahmen) beschaffen und mögliche Auswirkungen aufzeigen und erklären können.**

Mein Artefakt für dieses Handlungsziel besteht aus folgenden Beschreibungen und Beispielen:

### Schutzziele

Die drei primären Schutzziele sind Vertraulichkeit, Integrität und Verfügbarkeit. Vertaulichkeit ist, dass nur die Personen Zugriff haben, die ihn auch haben sollten, Integrität die Korrektheit der Daten und Verfügbarkeit, dass die Daten abrufbar sind. Wenn er stattdessen die ganze Datenbank löscht, dann ist die Verfügbarkeit auch nicht mehr vorhanden.

#### Beispiel

Ein Hacker stiehlt das Passwort eines Mitarbeiters einer Versicherung durch Phishing und loggt sich dann mit dessen Konto ein. Dies ist eine Verletzung der Vertraulichkeit. Dadurch hat er Zugang zur Kundendatenbank und verändert dort seine Daten so, dass er besser versichert wird. Dies ist eine Unkorrektheit der Daten, ist also ein Verstoss gegen die Integrität. 

### Risiko

Risiko beurteilen | Kleiner Schaden | Grosser Schaden
---|---|---
Hohe Eintrittswahrscheinlichkeit | Mittleres Risiko (reduzieren) | Grosses Risiko (vermeiden)
Niedrige Eintrittswahrscheinlichkeit | Kleines Risiko (akzeptieren) | Mittleres Risiko (reduzieren)

#### Beispiel
Du hast eine teure Uhr und eine sehr billige. Die Schweiz ist ein relativ sicheres Land, aber du gehst bald nach Mexico in den Urlaub, wo sie dir vielleicht gestohlen wird.

Risiko beurteilen | Kleiner Schaden | Grosser Schaden
---|---|---
Hohe Eintrittswahrscheinlichkeit | billige Uhr in Mexico | teure Uhr in Mexico
Niedrige Eintrittswahrscheinlichkeit | billige Uhr in der Schweiz | teure Uhr in der Schweiz

In der Schweiz mit einer billigen Uhr herumzulaufen ist ein kleines Risiko und das ist akzeptabel.
In der Schweiz mit einer teuren Uhr oder in Mexico mit einer billigen Uhr herumzulaufen ist ein mittleres Risiko und sollte reduziert werden, indem man zum Beipiel in der Nacht nicht nach draussen geht. In Mexico eine mit einer teuren Uhr herumzulaufen sollte vermieden werden.

### Erreichung Handlungsziel 1
Ich kann Bedrohungen den Schutzzielen zuordnen und das Risiko beurteilen.

## Handlungsziel 2
**Sicherheitslücken und ihre Ursachen in einer Applikation erkennen können. Gegenmassnahmen vorschlagen und implementieren können.**

Mein Artefakt, um das Erreichen des Handlungsziel 2 nachzuweisen, ist ein Code, der sich im Branch _HZ-2_ befindet.

Um das Programm gegen SQL-Interpreter-Injection zu schützen, habe ich Escaping angwandt, so dass ```'``` durch ```/'``` ersetzt wird.                ```request.Username.Replace("'", "/'"),```

Um das Progamm gegen Cross Site Scripting (XSS) zu schützen, habe ich sowohl beim Erstellen als auch Updaten der Artikel den Inhalt der Header und Details escaped, indem ich die kritischen Zeichen in die entsprechenden Zeichenfolgen habe umwandeln lassen.

```
using System.Web;

// Escaping XSS at create
newNews.Header = HttpUtility.HtmlEncode(request.Header);
newNews.Detail = HttpUtility.HtmlEncode(request.Detail);

// Escaping XSS at update
news.Header = HttpUtility.HtmlEncode(request.Header);
news.Detail = HttpUtility.HtmlEncode(request.Detail);
```

### Erreichung Handlungsziel 2


## Handlungsziel 3
**Mechanismen für die Authentifizierung und Autorisierung umsetzen können.**

## Handlungsziel 4
**Sicherheitsrelevante Aspekte bei Entwurf, Implementierung und Inbetriebnahme berücksichtigen**

## Handlungsziel 5
**Informationen für Auditing und Logging generieren. Auswertungen und Alarme definieren und implementieren**

## Selbsteinschätzung des Erreichungsgrades der Kompetenz des Moduls
