# Web (React) Application README
## Introduction
This web application is part of the larger exercise to develop a full-fledged social media platform. It serves as the frontend component, interacting with the backend server to provide various features to users, such as registration, authentication, posting, friend management and more. The application is built using React, ensuring a responsive and interactive user experience.

## Features
- User registration and authentication
- User login/logout functionality
- Displaying a feed of posts from friends and non-friends
- Posting new content
- Viewing user profiles and their posts
- Editing and deleting user posts (only the owner)
- Friend management functionalities: adding, removing, and accepting friend requests

## Prerequisites
Before setting up the web application, ensure you have the following prerequisites:
- Node.js installed on your machine
- A compatible web browser (e.g., Chrome, Firefox, Safari)
- Create an .env file in the server directory and add the following code:
  ```
  MONGODB_USER="barilan"
  MONGODB_PASS="Iia8RPyuqVVT5YZo"
  ```
I realised it was missing from github after the due date, for some reason it was not added during the commits. Here is the picture of the structure. Very sorry for the inconvenience.

![image](https://github.com/ilanitb16/facebook-ex2/assets/97344492/920e3325-c5e5-4afb-8072-33f1e0454274)


## Installation
1.	Clone the repository to your local machine:
```
git clone https://github.com/ilanitb16/facebook-ex2.git 
```
2.	Navigate to the project directory:
``` 
cd client-react
```
3.	Install dependencies using npm:
```
 npm install 
```
## Configuration
No specific configuration is required for the web application. However, ensure that the backend server is running and accessible at the specified API endpoints.

## Running the Application
To start the web application, navigate to the server directory and run:
```
Node index.js
```
This command will start a development server, and the application will be accessible at `http://localhost:3000` by default.
NOTE: If you made any modifications in our project, to access the app on the server, you must run npm run build in the client-react directory first, then copy it's content into public folder in the client-react directory and then run node.js server as described above. 

## Usage
Once the application is running, you can access it via a web browser by navigating to `http://localhost:3000`. From there, you can register as a new user, log in with existing credentials, view your feed, post new content, manage friends, and perform other actions as described in the features section.

## API Endpoints
The web application interacts with the backend server through a set of API endpoints. Refer to the backend README for detailed information on the API endpoints and their functionalities.

## Visual Examples of the functionalities:

 ### Home Page
 Hompage which allows to see 20 posts of friends (sorted by date) and 5 posts of other users (which are NOT the current user).
![image](https://github.com/ilanitb16/facebook-ex2/assets/97344492/e93b4103-2468-4266-99db-5f7833599613)

### User's Page
A page full of posts only the current user posted. Is accessible by pressing the name of the user displayed in the right corner of the screen.
![image](https://github.com/ilanitb16/facebook-ex2/assets/97344492/0c1de117-e3d8-44f8-809c-016a9ba35d88)


### Friends
- successful request notification + actual request can be seen under the user's requests.
- request already exists.
- Friends list.

  ![image](https://github.com/ilanitb16/facebook-ex2/assets/97344492/c8f71224-d42b-41cf-be3e-ebed9098c33a)
  ![image](https://github.com/ilanitb16/facebook-ex2/assets/97344492/cf5374d1-2681-4215-aeb9-ecbcdfa265ca)
  ![image](https://github.com/ilanitb16/facebook-ex2/assets/97344492/00ed5707-9429-467a-bb7a-9ebe2c3bb02e)
  ![image](https://github.com/ilanitb16/facebook-ex2/assets/97344492/da8c865b-a711-4f85-abc6-97d238483a54)


  ### Working Search
  ![image](https://github.com/ilanitb16/facebook-ex2/assets/97344492/f5e6ec19-0e2f-4dad-ae10-ec9e970f97ef)

  ### Login and Registration

  ![image](https://github.com/ilanitb16/facebook-ex2/assets/97344492/85a31e15-8605-42d5-827e-3aca8096a066)
  ![image](https://github.com/ilanitb16/facebook-ex2/assets/97344492/2c7509d3-e79c-4d5b-a633-7ec6e11c7909)
  ![image](https://github.com/ilanitb16/facebook-ex2/assets/97344492/b71b4243-7e95-4631-bd42-70a338836123)
  ![image](https://github.com/ilanitb16/facebook-ex2/assets/97344492/5703bae4-d1d5-47f8-8529-6958121f3dc5)

  ### Update User
  ![image](https://github.com/ilanitb16/facebook-ex2/assets/97344492/049b1375-5d91-471a-9686-b118a3e65513)

  ### New Post
  ![image](https://github.com/ilanitb16/facebook-ex2/assets/97344492/73b70179-23e8-4974-b4c2-545c907d26cd)

  ### Edit Post
  ![WhatsApp Image 2024-04-29 at 11 38 41_48cd74bf](https://github.com/ilanitb16/facebook-ex2/assets/97344492/2502200d-388f-4ce2-b0b2-bdededa28645)
  ![WhatsApp Image 2024-04-29 at 11 39 09_d1af1bcf](https://github.com/ilanitb16/facebook-ex2/assets/97344492/43aa26dd-bc7a-47bf-ba08-4b4770bde86a)
  ![WhatsApp Image 2024-04-29 at 11 39 21_fa81a449](https://github.com/ilanitb16/facebook-ex2/assets/97344492/37c5e5a0-c331-49c8-8a17-c67b70ce56b5)

  ### Deleting Post
  ![WhatsApp Image 2024-04-29 at 11 40 56_296b63f8](https://github.com/ilanitb16/Android-App/assets/97344492/647ce12d-a9c3-48ae-a287-70a2f674890a)
  ![WhatsApp Image 2024-04-29 at 11 41 11_22f9463a](https://github.com/ilanitb16/Android-App/assets/97344492/d00a480e-24b9-4ef6-8a07-9d0fc982e312)

