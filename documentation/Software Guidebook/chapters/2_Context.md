# Context
In dit hoofdstuk zal de context van de applicatie Programmero worden gedocumenteerd. Dit hoofdstuk is erg belangrijk om de intentie en motivatie van het probleem in te zien. In het volgende hoofdstuk zal worden ingegaan hoe dit probleem in zijn geheel wordt opgelost met de applicatie.

## Probleemstelling
Programmero is een applicatie die docenten van de HAN (hogeschool van Arnhem -en Nijmegen) een nieuwe manier van het vak SPD geven zou moeten aanbieden. Docenten hebben hierbij aangegeven dat bepaalde studenten die het vak SPD volgen, soms niet goed kunnen meegaan in de lessen. De docenten van de HAN hebben onderzoek gedaan naar lesmethoden die anders zijn om zo de studenten te helpen die moeite hebben om het huidige lesprogramma te volgen. 

De huidige lesmethode valt onder het "whole-word" principe. Hierbij worden hele woorden gebruikt om programmeertalen uit te leggen en te oefenen.  Hierbij wilt de productowner een applicatie hebben die een "phonix" principe aanpakt. Het "phonix" principe bied een lesstijl aan die een taal en grammatica opdelen in kleine stukken ophakt en daarin vragen kan neerzetten om mee te oefenen. Hiermee kan de productowner deze lesmethode aan zijn studenten aanbieden als ze moeite hebben met het "whole-word" principe in de lessen?

## Uitwerking
Het doel van de applicatie is:
- Een unieke applicatie neer te zetten voor studenten om nieuwe leermethodiek te promoten
- Vragen en lesprogramma's aanbied voor studenten die in deze leeromgeving moeten oefenen met een programmeertaal
- Docenten de macht geven om lesprogramma's en vragen te beheren

Het product zal bestaan uit twee onderdelen: de backend die alle aanvragen behandeld en die toegang heeft tot de database. En de React frontend die kan worden bezocht door gebruikers en door studenten en docenten kan worden gebruikt. Deze twee onderdelen vormen samen de applicatie.

## Gebruikers
Programmero heeft drie typen gebruikers:
- Anonieme gebruiker
- Student
- Docent

Elk van deze gebruikers zal nog worden toegelicht onder hoofdstuk 3: functionele overview