# facebook-ex2

In this exercise we write a web application using JS, CSS, HTML and React, as well as an Android application.

## Running the application instructions:
- `cd web` (change directory to web).
- `npm start`.
- node: node_modules is in git ignore so before running the code make sure to type in npm install.

To run the tests:
- `npm test`.

## Web Application Features:

1. **Registration Screen**: Allows users to register by providing a username, password, confirmation password, display name, and selecting a profile picture.
2. **Login Screen**: Users can log in with their username and password or navigate to the registration screen.
3. **Feed Screen**: Displays a scrollable list of posts with options to like, share, and comment. Users can also add new posts and switch between dark and light themes.

### Implementation Details:
- Proper input validation for registration and login fields.
- Component-based architecture using React, with reusable components for each screen and functionality.
- Use of useRef and useState hooks for managing state.
- Implementation of React Router for navigation between screens.
- Testing: Includes at least 5 tests covering JavaScript functions and component manipulation.

### Images:

![image](https://github.com/ilanitb16/facebook-ex2/assets/97344492/5dc8c5a4-1169-4ecf-a967-49776932fc96)
![image](https://github.com/ilanitb16/facebook-ex2/assets/97344492/bd4ce317-4d42-427f-8c4f-9c61bb4d0226)
![image](https://github.com/ilanitb16/facebook-ex2/assets/97344492/39f16b77-809a-4f75-9392-5064bb82ff52)
![image](https://github.com/ilanitb16/facebook-ex2/assets/97344492/d95ed054-9d4f-481b-8130-cacef3fb21c8)


### Our work process: 

**Ilanit:** Project management via Jira: adding the tasks and dividing work into subtasks. Designing the layout for the login and registration screens considering options for navigation between them. Added some feed features after the merge. Allowed users to logout, created the design for adding posts and comments and made some general fixes in the code. Writing the tests for the react components and the basic functions.

Ori and I worked together on merging our parts and faced some technical difficulties. Making the components work together and running smoothly after the merge. Added user navigation after implementing correct user authentication logic.

**Ori:** Designing the layout for the feed screen in the web and the Android, considering elements such as post previews, user avatars, like/share/comment buttons and functionalities: adding and deleting comments and etc, menu for the share button, and a menu for navigation options: adding new post, supporting light/dark mode, responsible for the working search line, Develop functionality to fetch posts from a local JSON file and display them in the feed screen. Ensure smooth scrolling and efficient loading of posts. In the post responsible for the options for editing and deleting posts, wrote all the Jira tasks for the feed subject, all in the web and Android.

**Shmuel:** Login and registration components on Android. Design the layout for the login and  registration screen, including input fields for username, email, password, and password confirmation, along with a register and login button Ensure secure storage and handling of user registration data. 

Ilanit and Shmuel had similar parts in different technologies which allowed us to work together as a team and implement similar logic ideas. It allowed us to see the similarities and the differences between the two technologies. 


### Note to the person checking our project:

After the project was due, there was an accidental push to the main branch of the project. We were working on some improvements for the next part and out of habit pushed the completed changes to the main branch.
We spoke to Hemi about it, he said to mention it as an error in our readme file and to notify the teaching assistants on the matter. An email was sent about it from Ori Levi to Jhonatan Kelsi.
![image](https://github.com/ilanitb16/facebook-ex2/assets/97344492/3352559e-dd34-467b-8055-acdc1b60abb9)

Please be understanding of our mistake and ignore the commits made after the due date (accept the README file which is allowed).



### link to android git repo: https://github.com/ShmuelGranot/Facebook-iso-APP.git
