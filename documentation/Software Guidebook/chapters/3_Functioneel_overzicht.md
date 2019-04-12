# Functioneel overzicht
Dit hoofdstuk zal ingaan op alle inhoud die in de applicatie van Programmero zit. Dit gaat over informatie die de applicatie geeft, maar ook functionaliteit die de applicatie aanbied om zijn doel te bereiken.

## Lesprogramma's en codekaarten
Programmero bestaat uit:
- Lesprogramma - een lesprogramma is een lijst van codekaarten die:
	- De programmeertaal en structuur van een lesprogramma definiëren
	- Een oefening neerzet voor studenten
- Codekaart - een entiteit die uit de volgende onderdelen bestaat:
	- Een vraag gekoppeld aan de programmeertaal van het lesprogramma
	- Een antwoord die in phonix stijl is geformuleerd
- Score - Een visuele representatie van de score van een student of lesprogramma resultaten
- Student - Gebruiker die oefeningen kan doen op lesprogramma's die door een docent zijn gemaakt en daardoor punten kan scoren
- Docent - Gebruiker die lesprogramma's en codekaarten binnen een lesprogramma beheert

Binnen Programmero zijn lesprogramma's en codekaarten de kern van de applicatie. Een lesprogramma is een lijst van codekaarten die een docent kan aanmaken. Een student kan aan de hand van een lesprogramma vervolgens codekaarten invullen om het lesprogramma te voltooien en zo een oefening te voldoen. Daarbij kan de student bij elke oefening een score behalen.

## Gebruikers
#### Anonieme gebruikers
Anonieme gebruikers representeren alle gebruikers die geen account of inloggegevens hebben. Anonieme gebruikers kunnen niet in de applicatie komen en kunnen alleen het inlogscherm zien.

#### Student gebruiker
Student gebruikers representeren alle gebruikers die een account hebben met studentfunctionaliteit. Dit houdt in dat ze oefeningen kunnen maken van de lesprogramma's die in de applicatie staan en hier een score mee kunnen behalen.
Een student kan aan de hand van informatie die een leraar heeft een email ontvangen om een account te activeren.

#### Docent gebruiker
Docent gebruikers representeren gebruikers die een administrator account hebben. Hierbij kunnen docenten lesprogramma's en codekaarten aanmaken om ervoor te zorgen dat studenten kunnen oefenen aan deze lesprogrammas's. Ook kan een leraar een gebruiker toevoegen aan het systeem door een email en naam in te voeren. Vervolgens kan deze gebruiker een eigen wachtwoord invoeren.

## Gamificatie
In de applicatie is een vorm van gamificatie ingebouwd. Dit is een een basisvorm geïmplementeerd door een score per student, lesprogramma en vraag te berekenen. Deze scores kunnen vergeleken worden met studenten zodat er een competitieve omgeving kan worden gecreëerd. In de toekomst kan er ook op deze basis een competitieve vorm worden gemaakt waarin een student een andere student kan uitdagen in een in-app competitieve omgeving. Deze functionaliteit is uitgeschreven in [userstory 4](https://github.com/HANICA-DWA/sep2018-project-aardvark/issues/5).