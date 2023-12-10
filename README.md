## اهلا وسهلا
## EFA Project 3 - Soccer Match Reservation System

#### Setup Basic Express Server

- [ ] import express and assign to variable
- [ ] setup start port variable (5000) and start function

#### Connect To DB

- [ ] get connection string
- [ ] setup .env with MONGO_URL variable and assign the value
- [ ] import 'dotenv' and setup package
- [ ] import connect() and invoke in the starter
- [ ] restart the server
- [ ] mongoose V6 infoa

#### Basic Routes and Middleware

- [ ] setup / GET Route
- [ ] setup express.json() middleware
- [ ] setup 404 and errorHandler middleware
- [ ] import 'exress-async-errors' package

#### 404 vs ErrorHandler Middleware

#### Morgan Pacakge

- [Morgan Package](https://www.npmjs.com/package/morgan)

#### User Model

- [ ] create models folder and User.js file
- [ ] create schema with name,email, password (all type:String)
- [ ] export mongoose model

#### Validator Package

- [Validator](https://www.npmjs.com/package/validator)

#### Auth Routes Structure

- [ ] create controllers folder
- [ ] add authController file
- [ ] export (register,login,logout) functions
- [ ] res.send('some string value')
- [ ] create routes folder
- [ ] setup authRoutes file
- [ ] import all controllers
- [ ] setup three routes
- [ ] post('/register') post('/login') get('/logout')
- [ ] import authRoutes as authRouter in the app.js
- [ ] setup app.use('/api/v1/auth', authRouter)

#### Test Routes in Postman

#### Register Controller

- [ ] create user
- [ ] send response with entire user (only while testing)
- [ ] check if email already in use (schema and controller)
- [ ] ignore 'role'
- [ ] alternative 'admin' setup

#### Handle Password

- [ ] UserSchema.pre('save') - hook
- this points to User
- bcrypt.genSalt - number of rounds
- bcrypt.hash

#### JWT

- [ ] require 'jsonwebtoken' package
- [ ] create jwt - jwt.sign(payload,secret,options)
- [ ] verify jwt - jwt.verify(token,secret)
- [ ] add variables in .env JWT_SECRET=jwtSecret and JWT_LIFETIME=1d
- [ ] restart the server !!!!
- [ ] refactor code, create jwt functions in utils
- [ ] refactor cookie code
- [ ] setup func attachCookiesToResponse
- [ ] accept payload(res, tokenUser)
- [ ] create token, setup cookie
- [ ] optionally send back the response

#### Login Route

- [ ] check if email and password exist, if one missing return 400
- [ ] find user, if no user return 401
- [ ] check password, if does not match return 401
- [ ] if everything is correct, attach cookie
  and send back the same response as in register

#### Logout Route

- [ ] set token cookie equal to some string value
- [ ] set expires:new Date(Date.now())

#### User Routes Structure

- [ ] add userController file
- [ ] export (getAllUsers,getSingleUser,showCurrentUser,updateUser,updateUserPassword) functions
- [ ] res.send('some string value')
- [ ] setup userRoutes file
- [ ] import all controllers
- [ ] setup just one route - router.route('/').get(getAllUsers);
- [ ] import userRoutes as userRouter in the app.js
- [ ] setup app.use('/api/v1/users', userRouter)

#### GetAllUsers and GetSingleUser

- [ ] Get all users where role is 'user' and remove password
- [ ] Get Single User where id matches id param and remove password
- [ ] If no user 404

#### Authenticate User Setup

#### Auth User Complete

#### Authorize Permissions Setup

- [ ] hardcode

#### Authorize Permissions Complete

- [ ] introduce params

#### ShowCurrentUser

- [ ] get user from req
- [ ] send response with user

#### UpdateUserPassword

- [ ] almost identical to login user
- [ ] add authenticateUser middleware in the route
- [ ] check for oldPassword and newPassword in the body
- [ ] if one missing 400
- [ ] look for user with req.user.userId
- [ ] check if oldPassword matches with user.comparePassword
- [ ] if no match 401
- [ ] if everything good set user.password equal to newPassword
- [ ] await user.save()

#### createTokenUser in Utils

- [ ] create a file in utils (createTokenUser)
- [ ] setup a function that accepts user object and returns userToken object
- [ ] export as default
- [ ] setup all the correct imports/exports and refactor existing code

#### updateUser with User.findOneAndUpdate()

- [ ] add authenticateUser middleware in the route
- [ ] check for name and email in the body
- [ ] if one is missing, send 400 (optional)
- [ ] use findOneAndUpdate()
- [ ] create token user, attachCookiesToResponse and send back the tokenUser

#### updateUser with user.save()

#### Setup and Apply checkPermissions()

Certainly! Let's break down the tasks into a to-do list:

### User Model

- [ ] Create a `models` folder.
- [ ] Create a `User.js` file.
- [ ] Define a schema in `User.js` with the following fields:
  - `Username: {type: String, required: true, unique: true}`
  - `Email: {type: String, required: true, unique: true}`
  - `Password: {type: String, required: true}`
  - `Matches: [{type: mongoose.Schema.Types.ObjectId, ref: 'ReservedMatch'}]`
- [ ] Export the Mongoose model for the User.

### ReservedMatch Model

- [ ] Create a `reservedMatch.js` file.
- [ ] Define a schema in `reservedMatch.js` with the following fields:
  - `Match: {type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true}`
  - `SeatRow: {type: Number, required: true}`
  - `SeatColumn: {type: Number, required: true}`
- [ ] Export the Mongoose model for ReservedMatch.

### Match Model

- [ ] Create a `Match.js` file.
- [ ] Define a schema in `Match.js` with the following fields:
  - `FirstTeam: {type: mongoose.Schema.Types.ObjectId}`
  - `SecondTeam: {type: mongoose.Schema.Types.ObjectId}`
  - `Stadium: {type: mongoose.Schema.Types.ObjectId}`
  - `Date: {type: Date}`
  - `Referee: {type: mongoose.Schema.Types.ObjectId}`
  - `FirstLineMan: {type: mongoose.Schema.Types.ObjectId}`
  - `SecondLineMan: {type: mongoose.Schema.Types.ObjectId}`
  - `Fans: {type: mongoose.Schema.Types.ObjectId}`
- [ ] Export the Mongoose model for Match.
### Stadium Model
- [ ] Create a `Stadium.js` file.
- [ ] Define a schema in `Stadium.js` with the following fields:
  - `Name: {type: String, required: true}`
  - `Capacity: {type: Number, required: true}`
  - `Location: {type: String, required: true}`
  - `Matches: [{type: mongoose.Schema.Types.ObjectId, ref: 'Match'}]`
- [ ] Export the Mongoose model for Stadium.

### Team Model
- [ ] Create a `Team.js` file.
- [ ] Define a schema in `Team.js` with the following fields:
  - `Name: {type: String, required: true}`
  - `Players: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]`
  - `Matches: [{type: mongoose.Schema.Types.ObjectId, ref: 'Match'}]`
  - `Stadium: {type: mongoose.Schema.Types.ObjectId}`
- [ ] Export the Mongoose model for Team.

### Referee Model
- [ ] Create a `Referee.js` file.
- [ ] Define a schema in `Referee.js` with the following fields:
  - `Name: {type: String, required: true}`
  - `Matches: [{type: mongoose.Schema.Types.ObjectId, ref: 'Match'}]`

- [ ] Export the Mongoose model for Referee.

### Fan Model
- [ ] Create a `Fan.js` file.
- [ ] Define a schema in `Fan.js` with the following fields:
  - `Name: {type: String, required: true}`
  - `Matches: [{type: mongoose.Schema.Types.ObjectId, ref: 'Match'}]`




#### Match Routes in Postman
#### ReservedMatch Routes in Postman
#### User Routes in Postman
#### Stadium Routes in Postman
#### Team Routes in Postman
#### Referee Routes in Postman
#### Fan Routes in Postman

#### Create Match

- [ ] create user property on req.body and set it equal to userId (req.user)
- [ ] pass req.body into Match.create
- [ ] send back the product

#### Remaining Controllers (apart from uploadImage)

- [ ] getAllMatches, getSingleMatch, updateMatch, deleteMatch
- [ ] getAllReservedMatches, getSingleReservedMatch, updateReservedMatch, deleteReservedMatch
- [ ] getAllUsers, getSingleUser, updateUser, deleteUser, signupUser, loginUser, logoutUser, showCurrentUser, updateUserPassword, resetUserPassword, forgotUserPassword, confirmUserPassword, confirm
- [ ] getAllStadiums, getSingleStadium, updateStadium, deleteStadium
- [ ] getAllTeams, getSingleTeam, updateTeam, deleteTeam
- [ ] getAllReferees, getSingleReferee, updateReferee, deleteReferee
- [ ] getAllFans, getSingleFan, updateFan, deleteFan
- [ ] getAllReviews, getSingleReview, updateReview, deleteReview


#### Populate

#### Virtuals

#### Get Single Match Reviews


#### Aggregation Pipeline - Atlas and Code


#### Create Docs

- [ ] [Docgen Library] (https://github.com/thedevsaddam/docgen)
- [ ] Export Postman Collection
- [ ] docgen build -i fileName.json -o index.html
- [ ] create index.html in public

#### Security Packages

- [ ] express-rate-limiter
- [ ] helmet
- [ ] xss-clean
- [ ] express-mongo-sanitize
- [ ] cors (cookies!!!!)

#### Deploy on Heroku

- [ ] heroku account and heroku cli
- [ ] remove/copy from the main repo
- [ ] add dev command "nodemon app.js"
- [ ] change start to "node app.js"
- [ ] setup node version in package.json
- [ ] "engines": {"node": "14.x"}
- [ ] Procfile "web: node app.js"
- [ ] remove existing git repo
- [ ] rm -rf .git - mac,
- [ ] git init
- [ ] git add .
- [ ] git commit -m "initial commit"
- [ ] heroku login
- [ ] heroku create "App Name"
- [ ] git remote -v
- [ ] setup env vars in GUI
- [ ] git push heroku master/main

