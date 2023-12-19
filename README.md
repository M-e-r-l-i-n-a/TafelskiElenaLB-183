# TafelskiElenaLB-183

## Einleitung
Dieses ePortfolio dient dazu, meine Kompetenzen im Modul 183, Applikationssicherheit implementieren, nachzuweisen. Es ist in die fünf Handlungsziele eingeteilt.

## Handlungsziel 1
**Aktuelle Bedrohungen erkennen und erläutern können. Aktuelle Informationen zum Thema (Erkennung und Gegenmassnahmen) beschaffen und mögliche Auswirkungen aufzeigen und erklären können.**

### Artefakt
In meinem Artefakt habe ich die drei primären Schutzziele und das Beurteilen des Risikos erklärt und an Beispielen aufgezeigt.

#### Schutzziele

Die drei primären Schutzziele sind Vertraulichkeit, Integrität und Verfügbarkeit. Vertaulichkeit ist, dass nur die Personen Zugriff haben, die ihn auch haben sollten, Integrität die Korrektheit der Daten und Verfügbarkeit, dass die Daten abrufbar sind. Wenn er stattdessen die ganze Datenbank löscht, dann ist die Verfügbarkeit auch nicht mehr vorhanden.

##### Beispiel

Ein Hacker stiehlt das Passwort eines Mitarbeiters einer Versicherung durch Phishing und loggt sich dann mit dessen Konto ein. Dies ist eine Verletzung der Vertraulichkeit. Dadurch hat er Zugang zur Kundendatenbank und verändert dort seine Daten so, dass er besser versichert wird. Dies ist eine Unkorrektheit der Daten, ist also ein Verstoss gegen die Integrität. 

#### Risiko

Risiko beurteilen | Kleiner Schaden | Grosser Schaden
---|---|---
Hohe Eintrittswahrscheinlichkeit | Mittleres Risiko (reduzieren) | Grosses Risiko (vermeiden)
Niedrige Eintrittswahrscheinlichkeit | Kleines Risiko (akzeptieren) | Mittleres Risiko (reduzieren)

##### Beispiel
Du hast eine teure Uhr und eine sehr billige. Die Schweiz ist ein relativ sicheres Land, aber du gehst bald nach Mexico in den Urlaub, wo sie dir vielleicht gestohlen wird.

Risiko beurteilen | Kleiner Schaden | Grosser Schaden
---|---|---
Hohe Eintrittswahrscheinlichkeit | billige Uhr in Mexico | teure Uhr in Mexico
Niedrige Eintrittswahrscheinlichkeit | billige Uhr in der Schweiz | teure Uhr in der Schweiz

In der Schweiz mit einer billigen Uhr herumzulaufen ist ein kleines Risiko und das ist akzeptabel.
In der Schweiz mit einer teuren Uhr oder in Mexico mit einer billigen Uhr herumzulaufen ist ein mittleres Risiko und sollte reduziert werden, indem man zum Beipiel in der Nacht nicht nach draussen geht. In Mexico eine mit einer teuren Uhr herumzulaufen sollte vermieden werden.

### Erreichung Handlungsziel 1
Ich kann nun Bedrohungen den Schutzzielen zuordnen und das Risiko beurteilen und somit ist "Aktuelle Bedrohungen erkennen und erläutern können." erfüllt. 

### Kritische Beurteilung
Den Teil "Aktuelle Bedrohungen erkennen und erläutern können." habe ich erfüllt. Ich habe den zweiten Teil "Aktuelle Informationen zum Thema (Erkennung und Gegenmassnahmen) beschaffen und mögliche Auswirkungen aufzeigen und erklären können." nicht behandelt, da man das ganz einfach googlen oder auf https://owasp.org/www-project-top-ten/ nachschauen kann.

## Handlungsziel 2
**Sicherheitslücken und ihre Ursachen in einer Applikation erkennen können. Gegenmassnahmen vorschlagen und implementieren können.**

### Artefakt
Mein Artefakt, um das Erreichen des Handlungsziel 2 nachzuweisen, ist ein Code, der sich im Branch _HZ-2_ befindet.

Um das Programm gegen SQL-Interpreter-Injection zu schützen, habe ich im LoginController.cs Escaping angwandt, so dass ```'``` durch ```/'``` ersetzt wird.                ```request.Username.Replace("'", "/'"),```
Das bewirkt, dass kritische Eingaben, wie zum Beispiel ```administrator '--```, keine unerwarteten Dinge tun. Wenn man diese Eingabe ohne Escaping tätigt, wird nur der Benutzername gelesen und das Passwort, was danach kommt einfach ignoriert und man ist angemeldet.

Um das Progamm gegen Cross Site Scripting (XSS) zu schützen, habe ich im NewsController.cs sowohl beim Erstellen als auch Updaten der Artikel den Inhalt der Header und Details escaped, indem ich die kritischen Zeichen in die entsprechenden Zeichenfolgen habe umwandeln lassen. Auch das ist dafür zuständig, dass Code, den ein User in ein normales eingabefeld schreibt, nicht als Code wahrgenommen wird.

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
Ich kann Sicherheitslücken und ihre Ursachen in einer Applikation erkennen, indem ich ausprobiere und den Code genau studiere. Ich kann Massnahmen gegen SQL-Injection und XSS vorschlagen und wie man in den Artefakten sieht, auch implementieren.

### Kritische Beurteilung
Es gibt noch mehr Sicherheitslücken, die nicht behandelt wurden.

## Handlungsziel 3
**Mechanismen für die Authentifizierung und Autorisierung umsetzen können.**

### Artefakt

```
private string CreateToken(User user)
{
    string issuer = _configuration.GetSection("Jwt:Issuer").Value!;
    string audience = _configuration.GetSection("Jwt:Audience").Value!;

    List<Claim> claims = new List<Claim> {
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.UniqueName, user.Username),
            new Claim(ClaimTypes.Role,  (user.IsAdmin ? "admin" : "user"))
    };

    string base64Key = _configuration.GetSection("Jwt:Key").Value!;
    SymmetricSecurityKey securityKey = new SymmetricSecurityKey(Convert.FromBase64String(base64Key));

    SigningCredentials credentials = new SigningCredentials(
            securityKey,
            SecurityAlgorithms.HmacSha512Signature);

    JwtSecurityToken token = new JwtSecurityToken(
        issuer: issuer,
        audience: audience,
        claims: claims,
        notBefore: DateTime.Now,
        expires: DateTime.Now.AddDays(1),
        signingCredentials: credentials
     );

    return new JwtSecurityTokenHandler().WriteToken(token);
}
```
Dieses Artefakt stammt aus dem Auftrag Broken Access Control. Es wird ein JWT Token erstellt, der zur Authentifizierung und Autorisierung verwendet wird. Es wird bei jedem Anmelden eine Session mit einzigartigem Token erstellt, der dann jedes Mal abgefragt wird, bevor man zum Beispiel etwas bearbeitet. Damit das geht, muss man zuerst das NuGet-Paket BCrypt.Net-next installieren.

### Erreichung Handlungsziel 3
Das kann JWT implementieren, was ein Mechanismus für die Authentifizierung und Autorisierung ist.

### Kritische Beurteilung
Nachdem es nicht geklappt hat, habe ich den Code aus der Lösung übernommen, es ist also nicht wirklich Eigenleistung.

## Handlungsziel 4
**Sicherheitsrelevante Aspekte bei Entwurf, Implementierung und Inbetriebnahme berücksichtigen**

## Artefakt

### Erreichung Handlungsziel 3


### Kritische Beurteilung

## Handlungsziel 5
**Informationen für Auditing und Logging generieren. Auswertungen und Alarme definieren und implementieren**

## Artefakt

### Erreichung Handlungsziel 3


### Kritische Beurteilung

## Selbsteinschätzung des Erreichungsgrades der Kompetenz des Moduls
