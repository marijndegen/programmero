# Software architectuur

## Context diagram
![alt text](../images/Context_diagram.svg "Context diagram")

In dit bovenstaande diagram is de context van het Programmero syteem getekend. Hier zijn alle systemen waar de eindgebruiker van de applicatie interactie mee heeft om de applicatie in zijn geheel te laten werken. 

## Container diagram
![alt text](../images/Container_diagram.svg "Container diagram")

Dit container diagram is een visuele representatie van het hele Programmero systeem. Hier zijn alle interne en externe onderdelen van de applicatie weergegeven om een duidelijk beeld te krijgen hoe elk onderdeel van de applicatie met elkaar werkt op een macro grootte.

* Web applicatie: Een met React, Redux en Javascript gemaakte front-end website waarop gebruikers acties kunnen uitvoeren.
* Web server: Een Javscript, Express en mongoDB server dat de enige plek is waar gebruikers via het Internet het systeem kunnen bereiken.
* Database: Een MongoDB/Mongoose database die Programmero gebruikt om data op te slaan.
* Mail server: Een Mailtrap.io server die gebruikt wordt om emails vanaf het systeem naar de gebruikers te sturen.

## Component Front-end diagram
Dit diagram toont de relatie tussen alle componenten binnen het front-end systeem van Programmero.

### __Let op:__
* Redux Reducers komen vaker voor en staan aangegeven per kleur. Dit is gedaan omdat meerdere React componenten bepaalde Reducers gebruiken.
* Redux Actions staan niet in het diagram omdat het heel erg lastig is om deze duidelijk te tonen. Een React component kan bijvoorbeeld zonder action bij een reducer data ophalen, maar hij kan ook via een action data schrijven naar een reducer. Onder het diagram staat per React component beschreven welke action deze gebruikt.

![alt text](../images/Component_diagram_front_end.svg "Component Front-end diagram")

Dit frontend component diagram laat de gehele werking van de frontend React componenten zien. Frontend bestaat uit 3 begrippen: components, action creators en reducers met elk hun eigen functionalteit. Hierbij zijn:
- Components: User Interface React elementen die onderdelen van de applicatie renderen en acties kunnen uitvoeren.
- Action creators: Worden door components beheerd en aangeroepen, veranderen de state van Redux door reducers aan te roepen.
- Reducers: Functies die informatie uitsluiten.

#### Action creators per  React Component:
* AddQuestion.jsx gebruikt actionCreator(s): questionManagementAction, lessonManagementAction.
* AddPassword.jsx gebruikt actionCreator(s): userActions.
* InviteUser.jsx gebruikt actionCreator(s): userActions.
* LessonManagement.jsx gebruikt actionCreator(s): lessonManagementAction.
* Login.jsx gebruikt actionCreator(s): userActions.
* QuestionEdit.jsx gebruikt actionCreator(s): questionManagementAction, lessonManagementAction.
* QuestionManagement.jsx gebruikt actionCreator(s): questionManagementAction, lessonManagementAction.
* Feedback.jsx gebruikt actionCreator(s): practiceAction, questionManagementAction.
* LessonprogramResult.jsx gebruikt actionCreator(s): userActions.
* Practice.jsx gebruikt actionCreator(s): questionManagementAction, practiceAction.
* StudentProgramms.jsx gebruikt actionCreator(s): practiceAction, questionManagementAction, lessonManagementAction.

## Component Back-end diagram
Dit diagram toont de relatie tussen alle componenten binnen het back-end systeem van Programmero.

### __Let op:__
* Iedere Route gebruikt validationCheckers.js.

![alt text](../images/Component_diagram_backend.svg "Component Back-end diagram")

Dit laatste component diagram laat de gehele werking van de backend onderdelen zien. Backend bestaat uit 3 begrippen: Routes, models en middleware met elk hun eigen functionalteit. Hierbij zijn:
- Routes: alle REST endpoints van de server. Hier staan alle URLs waar de frontend van de applicatie aanvragen naar kan versturen.
- Models: de enige functies die toegang hebben tot de database. Deze worden gebruikt in de routes om controle te hebben over de collecties die er in de database staan.
- Middleware: alle functies die voor een request worden uitgevoerd. De enige middleware die we gebruiken is een authorisatie middleware die kijkt of een gebruiker is ingelogd en zet een sessie in de request zelf.