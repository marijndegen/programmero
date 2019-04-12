# Programmero 

De documentatie kan worden gevonden onder documentation/Software Guidebook.

#### Installatie handleiding

##### Voorwoord

Op het moment van schrijven is de software nog niet klaar om op grote schaal in productie te worden genomen, desondanks wordt er in dit hoofdstuk duidelijk wat er moet gebeuren om dit te realiseren.

##### Security overwegingen vóór productie.

In programmero wordt er altijd met wachtwoorden gewerkt. Deze handleiding geeft géén instructies om een SSL (voor https) certificaat te installeren, om de server in productie te laten draaien is dit  een vereiste. 

Ook is er nog geen rekening gehouden met brute force attacks, DDoS aanvallen etc. als de server niet op een geïsoleerd netwerk draait is het van belang dat deze problemen worden verholpen.

Momenteel kan een gebruiker zijn gegevens (email, wachtwoord) nog niet veranderen, dit is essentieel voor de veiligheid van een applicatie.

**Pre condities server**

Als database gebruikt programmero [mongo](https://www.mongodb.com/download-center/community), de database engine moet draaien.

De volgende programma's dienen op de server te staan (kunnen op de terminal worden uitgevoerd):

- [npm](https://nodejs.org/en/)
- [node](https://nodejs.org/en/)
- [nodemon (voor debuggen)](https://nodemon.io/) 
- [git](https://git-scm.com/)

**Installatiehandleiding**

Wanneer er iets fout is zal npm rode "ERROR" berichten geven. Wanneer deze niet in de output zitten is het aannemelijk dat alles goed is gegaan.

1. Clone de repository:

```
git clone https://github.com/HANICA-DWA/sep2018-project-aardvark
```

**Zorg dat je in [programmero-backend](https://github.com/HANICA-DWA/sep2018-project-aardvark/tree/development/programmero-backend) zit:**

```
npm i
```

2. Maak een .env bestand aan door .env.example te kopiëren, zorg dat alle variabelen in het .env bestand goed ingevuld zijn.

Windows:

```
copy .env.example .env
```

Mac / linux

```
cp .env.example .env
```

4. Voer het database bestand uit zodat de database gevuld wordt met een admin en student account, wanneer je "Database seeded!" ziet is het goed gegaan.

```
node databaseSeeder.js
```

**Zorg dat je in [programmero-frontend](https://github.com/HANICA-DWA/sep2018-project-aardvark/tree/development/programmero-frontend)  zit:**

```
npm i
```

**Operationele handleiding**

Zorg dat mongodb draait, start vervolgens de backend op:

**Zorg dat je in [programmero-backend](https://github.com/HANICA-DWA/sep2018-project-aardvark/tree/development/programmero-backend) zit:**

```
npm start
```

Start een nieuw terminal venster op

**Zorg dat je in [programmero-frontend](https://github.com/HANICA-DWA/sep2018-project-aardvark/tree/development/programmero-frontend) zit:**

```
npm start
```

Wanneer men nu [localhost:3000](http://localhost:3000) intikt in de browser zal men als het goed is de loginpagina moeten zien van programmero. Er kan worden ingelogd met admin@admin.nl en het wachtwoord test

**Automatisch testen**

Er zijn automatische testen beschikbaar, zie [hoofdstuk 8](https://github.com/HANICA-DWA/sep2018-project-aardvark/blob/development/documentation/Software%20Guidebook/chapters/8_Principes.md) van het softwareguidebook om de handleiding hiervan te bekijken.