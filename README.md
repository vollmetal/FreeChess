# FreeChess

![Screenshot (931)](https://user-images.githubusercontent.com/102641956/185979663-fda2a571-3591-465c-bb0f-f92735785369.png)

FreeChess is a chess game app I made to learn more about React and Redux work and explore different solutions to real-time page/client updates and client-server communication. 
It allows you to play chess games against other people and to watch other people play chess games.

## Functionality

When you arrive at the site you are greeted with a page with a welcome message and a list of games

![Screenshot (930)](https://user-images.githubusercontent.com/102641956/185980319-bffb08a0-ae38-4e69-b1aa-f3704ae1aab1.png)

Starting from the top of the screen you can click on the site icon to return to this screen, login, or register an account. You can also click the "join game" button on any game to join that game.

![Screenshot (929)](https://user-images.githubusercontent.com/102641956/185980498-4e05acda-22d6-4137-971d-e56ba64aa28c.png)

After you have logged in, either with a Google account or a personal account you registered with the site, the top right of the page will show your profile picture/avatar. You can click on this to go to the profile page and change some profile information.

![Screenshot (922)](https://user-images.githubusercontent.com/102641956/185980794-39be0b10-245e-4352-a785-d2b93ca61500.png)
![Screenshot (920)](https://user-images.githubusercontent.com/102641956/185980797-725c8e18-0a0c-421f-bf22-cd14864a06a7.png)

You can change what colors pieces are and your site theme here.

### Gameplay

When you click to join a game a screen like this will show and if you're logged in you will be able to click on the join buttons to join the game as the specified player.

![Screenshot (924)](https://user-images.githubusercontent.com/102641956/185981234-5993d299-dea2-4c56-88a7-2e2fa42cc7af.png)
![Screenshot (931)](https://user-images.githubusercontent.com/102641956/185981236-532b63ee-b73f-444e-8c8b-e56e11996fdd.png)

The top of the game board will tell who's playing as which side and who's turn it is. You can click on any piece outlined in grey to select it, then click on any green or red space to move the piece to that space.

![Screenshot (925)](https://user-images.githubusercontent.com/102641956/185981500-36a079f2-598f-4d83-9e36-8ed04d760ea5.png)
![Screenshot (927)](https://user-images.githubusercontent.com/102641956/185981503-cc522a52-8c68-4888-a82c-54da387e9a94.png)

Currently there isn't check and checkmate states nor are there more complex rules in the game yet, but I am working on implementing them.

## Libraries and tools used

### Front-End

Written in JavaScript with some CSS and HTML where needed

-Reactjs
-Redux/React-Redux
-Firebase
-Mui

### Back-End

Written in JavaScript

The server uses both MongoDB and Firebase for it's backend. Firebase is used to help authorize accounts while MongoDB is used to handle both game data and extra user data not present in Firebase authentication.
Socket.io is used to allow the clients and server to communicate with each other to update pages and information in real-time.

-Node.js
-Socket.io
-Express
-Firebase
-MongoDB
-Mongoose
-dotenv

# Contributors

-Sarah Avins (https://github.com/vollmetal)
