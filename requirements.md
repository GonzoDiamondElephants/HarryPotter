Software Requirements

Vision


* **What is the vision of this product?** A Harry Potter-themed app for users to enter a questionaire & get sorted into a Hogwarts House

* **What pain point does this project solve?** This app is purely for fun and helps the user know what house they belong in. Once sorted, an API call will generate a list of characters from their house & a character from the competing house so the user knows who to watch out for! It will also contain a beautiful user interface that will keep them engaged

* **Why should we care about your product?** The user should be able to participate in the magical Harry Potter universe and have fun while doing it.

Scope (In/Out)
 * **IN - What will your product do**

* Describe the individual features that your product will do.
High overview of each. Only need to list 4-5
- Create a form (or an application) for user to fill out 
- Use the user data to populate a house they belong in
- Use HP-API to pull names and images of characters from your sorted house
- Use HP-API to pull names and images of characters from competing houses
- Using DarkSky API to pull weather info from genuine Hogwaurts
- Design a color palette
- Use a wand cursor



* **OUT - What will your product not do.**

* These should be features that you will make very clear from the beginning that you will not do during development.
- Will not ever actually make the user magical... you muggle.


* **What will your MVP functionality be?**
* Uses the Harry Potter sorting API, Harry Potter character API, &  DarkSky
* The form will take in information about the user & store in a database
* DarkSky will alert the user to the weather at Hogwarts
* The sorting API will return a house & the character API will give them a list of friendly housemates & people to avoid.
* We will need:
- 2 front-end pages - index & sorting
- 1 server.js
- An app.js that will pull the info from the API
- 1 database & a matching schema

* **What are your stretch goals?**

Stretch
What stretch goals are you going to aim for?
Admissions form > sorting page

Functional Requirements
List the functionality of your product. This will consist of tasks such as the following:

- An admin can create and delete user accounts
- A user can enter their profile information
- A user can see a list of recommendations based on thier house placement



Data Flow
Describe the flow of data in your application. Write out what happens from the time the user begins using the app to the time the user is done with the app. Think about the “Happy Path” of the application. Describe through visuals and text what requests are made, and what data is processed, in addition to any other details about how the user moves through the site.

* User opens app: They see an "addmissions form" that asks them questions to determine the house they are to be sorted in, once they've answered all questions...
* User is whisked away to the sorting hat page which orients the user by telling them about their house, show a list of friendly faces that the user should get to know as well as competitors that they should avoid 


Non-Functional Requirements (301 & 401 only)
Non-functional requirements are requirements that are not directly related to the functionality of the application but still important to the app.
* Reliability - by creating a single page app that pulls alternate divs to display content we are assuring that the user will not run into any issues with other pages. If the home page loads, we can be assured the rest will work as well. 
* Maintainability - as developers we will take the time to make easy readable code that will be easy to maintain. We will choose smart names to ensure we can easily locate broken code and make quick fixes.



