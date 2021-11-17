# PWA Evaluation Project - Hotel Booking System

### MERN Stack

-   [MongoDB]
-   [Express.js]
-   [React.js]
-   [Node.js]

### Getting Started

```
# Clone the repository
$ git clone https://github.com/WallQ/pwa-project.git

# Change the directory
$ cd pwa-project/src

# Install the dependencies
$ npm install

# Start the app
$ npm start
```

## Routes

#### Endpoints for the authentication

| Endpoint             | Body Request Fields                              | Description          |
| -------------------- | ------------------------------------------------ | -------------------- |
| `POST /auth/sign-up` | {name: "", surname: "", email: "", password: ""} | Create a new user    |
| `POST /auth/sign-in` | {email: "", password: ""}                        | Authenticate an user |

#### Endpoints for Hotel

| Endpoint                     | Token Needed | Body Request    | Description                       |
| ---------------------------- | ------------ | --------------- | --------------------------------- |
| `GET /hotel/`                | No           |                 | Returns a list of hotels          |
| `POST /hotel/`               | Yes          |                 | Create a new hotel                |
| `GET /hotel/name/:hotelName` | No           | {name : "John"} | Returns a list of specific hotels |
| `GET /hotel/:hotelId`        | Yes          |                 | Returns a specific hotel          |
| `PUT /hotel/:hotelId`        | Yes          | {name : "John"} | Updates a specific hotel data     |
| `DELETE /hotel/:hotelId`     | Yes          |                 | Deletes a hotel                   |

### To do list

-   [ ] Endpoints for user

[mongodb]: https://www.mongodb.com/
[express.js]: https://expressjs.com/
[react.js]: https://reactjs.org/
[node.js]: https://nodejs.org/
