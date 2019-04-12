# Kwaliteit attributen
In dit hoofdstuk zullen kwaliteitsattributen van de Programmero applicatie beschreven worden. 

## Prestatie
De snelheid waarmee de applicatie op dit moment werkt is niet te berekenen aangezien deze lokaal wordt gedraaid. Dit is dus afhangend van de CPU die lokaal draait. In hoofdstuk 10 van dit software guidebook is een installatie gedaan op de NAS die niet representatief is voor een normale hosting die gedaan kan worden.

De laadtijd die is vastgesteld op de lokale omgeving is onder de 1 seconde.
De laadtijd die is vastgesteld op de NAS is 15 seconden.

## Veiligheid
De drie gebruikers die bij functioneel overzicht staan beschreven staan allemaal afgeschermd van elkaar in een eigen omgeving. We maken hier gebruik van JWT, een codebibliotheek die, wanneer je inlogt, een token bewaard in de localstorage van de client. Voor elke request die naar de server wordt gestuurd wordt deze token meegestuurd en vergeleken in de backend van de applicatie.

## Internationalisatie
De applicatie maakt alleen gebruik van Nederlandse taal en teksten. Er is geen rekening gehouden met meerdere talen ondersteuning.

## Compatibiliteit
De Programmero appplicatie is gemaakt voor mobiele form factor. De applicatie zal als je de applicatie op je mobiel bezoekt zich aanpassen op de resolutie van het scherm van de client.

De Programmero appplicatie werkt stabiel op de volgende browsers:
1. Google Chrome
2. Mozilla Firefox
3. Internet Explorer 8 (en nieuwere versies)
