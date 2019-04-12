# REST API reference

Dit hoofdstuk zal alle REST endpoints documenteren. Dit is zodat er een duidelijk overzicht is voor developers om te zien waar ze informatie kunnen halen, geven, aanpassen en verwijderen. De REST backend server gebruikt Node.JS en heeft MongoDB en ExpressJS geïnstalleerd staan. 

Alle inkomende aanvragen (requests) moeten met JSON worden aangevraagd. Hierbij moet er gebruik gemaakt worden van MIME-type "application/json" in de HTTP request header.

Het returntype van elk endpoint in de server is JSON. Hierbij zal het MIME-type "application/json" in de HTTP header worden meegegeven.

## Authenticatie

| Methode | Pad | Body/Payload | Omschrijving | Response |
|---------|-----|------|--------------|----------|
| GET | /auth/:mailToken/check | - | Checkt of een mailtoken van een gebruiker bestaat | HTTP 200: String <br> HTTP 400: Object |
| POST | /auth/login | `email: String`<br> `password: String` | Logt een gebruiker in op basis van gegeven email en password | HTTP 200: Webtoken <br> HTTP 422: Object <br> HTTP 500: Object |
| POST | /auth/secret | `mailToken: String` <br> `pass: String` <br> `passrepeat: String` | Valideert wachtwoord en zet een wachtwoord voor de gebruiker met aangegeven mailtoken | HTTP 200: No content <br> HTTP 400: Object |

## Lesprogramma's

| Methode | Pad | Body/Payload | Omschrijving | Response |
|---------|-----|------|--------------|----------|
| GET | /lessons | - | Geeft alle lesprogramma's terug | HTTP 200: Array<br> HTTP 401: Object <br> HTTP 500: Object |
| GET | /lessons/:lessonId | - | Geeft een specifiek lesprogramma terug op basis van het meegegeven ID | HTTP 200: Object <br> HTTP 401: Object <br> HTTP 422: Object <br> HTTP 404: Object <br>  HTTP 500: Object |
| POST | /lessons | `name: String`<br>`description: String` <br> `programmingLanguage: String` | Maakt een nieuw lesprogramma aan de hand van meegegeven POST gegevens | HTTP 201: Object <br/> HTTP 401: Object <br/> HTTP 422: Object <br>  HTTP 500: Object |
| PUT | /lessons/:lessonId | `name: String`<br>`description: String`<br>`programmingLanguage: String` | Past een bestaand lesprogramma aan aan de hand van meegegeven PUT gegevens | HTTP 200: Object <br> HTTP 401: Object <br/> HTTP 422: Object <br>  HTTP 500: Object |
| DELETE | /lessons/:lessonId | - | Verwijderd een specifiek lesprogramma op basis van het meegegeven ID | HTTP 204: No Content <br> HTTP 401: Object <br/> HTTP 422: Object <br>  HTTP 500: Object |

## Codekaarten

| Methode | Pad | Body/Payload | Omschrijving | Response |
|---------|-----|------|--------------|----------|
| GET | /lessons/:lessonId/codecards | - | Geeft alle codekaarten van een specifiek lesprogramma op basis van meegegeven ID | HTTP 200: Array <br> HTTP 401: Object <br> HTTP 404: Object <br> HTTP 422: Object  <br>  HTTP 500: Object |
| GET | /lessons/:lessonId/codecards/:codecardId | - | Geeft een specifieke codekaart in een lesprogramma terug op basis van meegegeven IDs | HTTP 200: Object<br> HTTP 401: Object <br> HTTP 404: Object <br> HTTP 422: Object <br>  HTTP 500: Object |
| GET | /lessons/:lessonId/codecards/student | - | Geeft een codekaart in een lesprogramma terug op basis van meegegeven ID en lessonresult dat de student heeft Zorgt ervoor dat het antwoord door elkaar gehusseld is | HTTP 200: Object<br> HTTP 401: Object <br> HTTP 404: Object <br> HTTP 409: Object <br> HTTP 422: Object <br>  HTTP 500: Object |
| POST | /lessons/:lessonId/codecards | `question: String`<br> `answer: [String]` | Maakt een nieuwe codekaart in een lesprogramma aan de hand van meegegeven POST gegevens en ID | HTTP 201: Object <br/> HTTP 401: Object <br> HTTP 404: Object <br> HTTP 422: Object <br>  HTTP 500: Object |
| PUT | /lessons/:lessonId/codecards/:codecardId | `question: String`<br> `answer: [String]` | Past een bestaande codekaart in een lesprogramma aan aan de hand van meegegeven PUT gegevens en IDs | HTTP 200: Object <br> HTTP 401: Object <br> HTTP 404: Object <br> HTTP 422: Object <br>  HTTP 500: Object |
| DELETE | /lessons/:lessonId/codecards/:codecardId | - | Verwijderd een specifieke codekaart in een lesprogramma op basis van het meegegeven ID | HTTP 204: No content <br> HTTP 401: Object <br> HTTP 404: Object <br> HTTP 422: Object <br> HTTP 500: Object |

## Oefenresultaten

| Methode | Pad | Body/Payload | Omschrijving | Response |
|---------|-----|------|--------------|----------|
| GET | /users/lessonresult/:lessonId/end | - | Haalt oefenresultaten op van laatste oefening die in een les is gemaakt op basis van meegegeven ID | HTTP 200: Object <br> HTTP 401: Object <br> HTTP 404: Object <br> HTTP 422: Object <br>  HTTP 500: Object |
| POST | /users/lessonresult/:lessonId | - | Maakt een nieuwe lessonresult, zodat een student met een oefening kan beginnen | HTTP 201: Object <br> HTTP 401: Object <br> HTTP 404: Object <br> HTTP 422: Object <br>  HTTP 500: Object |
| POST | /users/lessonresult/:lessonId/answer | `answer: [String]`<br>`index: Int` | Voegt een nieuw antwoord toe aan een lessonresult | HTTP 200: Object <br/> HTTP 401: Object <br> HTTP 404: Object <br> HTTP 422: Object <br> HTTP 500: Object |


## Gebruikers

| Methode | Pad | Body/Payload | Omschrijving | Response |
|---------|-----|------|--------------|----------|
| GET | /users/score | - | Vraagt de totaalscore van een gebruiker op | HTTP 200: Number <br> HTTP 401: Object <br> HTTP 500: Object |
| GET | /users/score/:lessonid | - | Vraagt de score van een specifieke les van een gebruiker op | HTTP 200: Number <br> HTTP 401: Object <br> HTTP 404: Object <br> HTTP 422: Object <br> HTTP 500: Object |
| POST | /users | `name: String` <br> `email: String`<br> `isAdmin: Boolean` | Maakt een nieuwe user aan en stuurt een mail naar naar de desbetreffende user | HTTP 201: No content <br> HTTP 400: Object <br> HTTP 422: Object <br> HTTP 500: Object |
