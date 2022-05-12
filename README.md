# Quiz-App
 In this project, I have used fundamental HTML, CSS, and JavaScript to build a quiz application. 
This application will be able to load questions from a 3rd party API, track and display high scores.

#Home Page
- The home page is consist of a few links for the Game and High Scores pages.

#Game Page
- The Game Page will display static question and answer information. 
- Eventually, Questions will be display from an API.
- The user's answer will be checked for correctness and display feedback to the user before loading the next question.
- A Heads Up Display (HUD) is created for quiz app. This will display the user's score and current question number.

#End Page
- End page will display the user's achieved score. This screen will provide a form for saving the score and links for playing again or going home.
- A high score will save and maintain in local storage.

#High Score Page
- High Scores page will load the high scores from Local Storage, iterate through them, and display them on the screen.

#Fetch API to load questions from local JSON file
- Sample questions are moved from a hard coded array to an external .json file. 
- To load questions from local JSON file Fetch API is used.

#Fetch API to load questions from open Trivia API
- Fetch API is used to request a list of questions from the Open Trivia DB API.
