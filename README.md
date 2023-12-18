# TafelskiElenaLB-183

## Einleitung
Dieses ePortfolio dient dazu, meine Kompetenzen im Modul 183, Applikationssicherheit implementieren, nachzuweisen. Es ist in die fünf Handlungsziele eingeteilt.

## Handlungsziel 1
Die drei primären Schutzziele sind Vertraulichkeit, Integrität und Verfügbarkeit. Vertaulichkeit ist, dass nur die Personen Zugriff haben, die ihn auch haben sollten, Integrität die Korrektheit der Daten und Verfügbarkeit, dass die Daten abrufbar sind.

Risiko beurteilen | Kleiner Schaden | Grosser Schaden
---|---|---
Hohe Eintrittswahrscheinlichkeit | Mittleres Risiko (reduzieren) | Grosses Risiko (vermeiden)
Niedrige Eintrittswahrscheinlichkeit | Kleines Risiko (akzeptieren) | Mittleres Risiko (reduzieren)

## Handlungsziel 2
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

## Handlungsziel 3

## Handlungsziel 4

## Handlungsziel 5

## Selbsteinschätzung des Erreichungsgrades der Kompetenz des Moduls
