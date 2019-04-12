## Hoe werkt git?

Kijk tijdens het uitvoeren van git pull en git merge altijd of er geen CONFLICT in de console verschijnt!

![alt merge conflicten](https://www.mupload.nl/img/bhg5c1k5t9a.jpg)

### Nieuwe branch aanmaken

```
git branch 
```

Dit moet development zijn, zo niet:

```
git checkout development
```

Vervolgens doe je:

```
git fetch --all
git pull
```

Kijk of er geen conflicten in de branch staan en maak vervolgens de branch aan.

```
git checkout -b feature/<naam van feature>
```

### Aan de branch werken

Zorg dat je in de root van de repository bent.

```
git status
```

Controleer of jouw werkt (ongeveer) overeenkomt met de bestanden, voer vervolgens de volgende riddle uit.

```
git add . 
git commit -m "Zeg welke delen code je hebt toegevoegd" 
git push
```



### Het up-to-date houden van de code (dagelijks doen!)

Zorg dat je alle wijzigingen hebt gecommit. Hier zouden geen problemen bij mogen ontstaan. Mocht dit wel gebeuren, vraag om hulp. Deze actie moet je altijd uitvoeren voordat je een pull request aanmaakt op github!

```
git status
git checkout development
git fetch --all
git pull
git checkout <naam van de branch waar je aan het werk op bent>
git merge development
```