# Infrastructure architectuur
In dit hoofdstuk worden de specificaties van de server waarop programmero kan draaien gedocumenteerd, Programmero is succesvol getest op een NAS, aan de hand hiervan zijn de minimum systeemeisen opgesteld.

#### Minimale specificaties

| Specificatie         | Waarde                   |
| -------------------- | ------------------------ |
| Modelnaam            | DS216+                   |
| CPU                  | INTEL Celeron N3050      |
| Kloksnelheid van CPU | 1.6 GHz                  |
| CPU-kernen           | 2                        |
| Fysiek geheugen      | 1024 MB                  |
| Operating system     | DSM 6.2.1-23824 Update 4 |

De setup is getest door node, git en npm te installeren. MongoDB draait als een container in een virtuele omgeving, vooral het opstarten van deze software is zwaar. Om deze reden is er geen deamon aangemaakt op de nas.

Op een server met gelijkwaarde specificaties kan Programmero draaien, dit raad het Aardvark team af. In deze omgeving wordt de deployment omgeving gezet. Omdat dit een hobby project is worden er geen credentials en procedures vrij gegeven, dit heeft te maken met non disclosure en veiligheid. Zie hoofdstuk aangeraden specificaties en installatie handleiding voor uitgebreidere installatieinstructies.

#### Aangeraden specificaties

| Specificatie         | Waarde                                                       |
| -------------------- | ------------------------------------------------------------ |
| CPU                  | Processorarchitectuur AMD64 (een 64 bit AMD of Intel processor) |
| Kloksnelheid van CPU | 3 Ghz of meer                                                |
| CPU-kernen           | 4                                                            |
| Fysiek geheugen      | 4GB of meer                                                  |
| Operating system     | Ubuntu 18.04.1 LTS Bionic (Meest recente LTS versie is ook goed) |