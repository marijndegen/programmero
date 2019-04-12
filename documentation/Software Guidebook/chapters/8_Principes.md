# Principes

## Configuratie
Configuratie is af en toe een lastig aspect van software ontwikkeling. Om alles op te zetten is ons eerste principe dan ook de configuratie die je moet hebben om de applicatie correct te laten werken, maar ook om bijvoorbeeld testing te laten werken.

Voor configuratie gebruiken we dotenv. Een bibliotheek die we in de `programmero-backend` en `e2e` folder gebruiken om desbetreffende artifacts op te zetten. We gaan ervan uit dat de sleutels die in de `.env.example` zelf ingevuld kunnen worden om de juiste lokale of remote configuratie de applicatie werkend te krijgen. Dit doe je door de `.env.example` te kopieëren en `.env` aan te maken en de juiste gegevens in te vullen. De bedoeling voor `programmero-backend` is hier dat je twee MongoDB databases hebt (een voor productie en een voor testing), app variabelen, een JWT secret key die je kan aamaken in `programmero-backend/scripts/createUserPassword.js` en SMPT gegevens voor de mailing.

## Geautomatiseerd testen
Een van de andere principes die we willen hanteren is het gebruik van unit tests en end-to-end tests. Hierbij wordt er een aparte omgeving neergezet waar de functionaliteiten van het opgezette artifact worden getest. Met een end-to-end test worden geen individuele functies getest, maar wordt de applicatie doorlopen in een automatische computergestuurde browser die door de applicatie klikt om onderdelen te testen die op elkaar werken volgens een bepaalde volgorde.

### Unit tests
Het gebruik van unit testing is om te blijven checken of functies die zijn gemaakt werken zoals ze ontworpen zijn. We testen hierbij functies en classes van verschillende onderdelen van de app in beide backend en frontend.

Om de tests correct uit te voeren moeten er de volgende commando's uitvoerd worden voor hun respectievelijke artifacten.

**Backend**
```
$ cd programmero-backend
$ npm i
$ npm test -- --runInBand --silent
```

**Frontend**
```
$ git checkout unittests/frontend
$ cd programmero-frontend
$ npm i
$ npm test
```

### End-to-end tests
End-to-end testing is het principe van een UI test die automatisch door de applicatie heen klikt en zo alles test.

```
$ cd e2e
$ npm i
$ npm start
```