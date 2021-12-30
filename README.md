# Todo Tracker Backend API Specifications

Create the backend for a todo website. The frontend/UI will be built using Vuejs. To create the app we need to complete the below tasks.

### Todos

- [] List all todos in the database
  - [] Pagination
  - [] Select specific fields in result
  - [] Limit number of results
  - [] Filter by fields
- [x] Get Single todo
- [x] Create new todo
  - [] Authenticated users only
  - [x] Field validation via mongoose
- [x] Update todo
  - [] Owner Only
  - [x] Validation on update
- [x] Delete todo
  - [] Owner only
- [x] Calculate number of todos

### Users & Authentication

- [x] Authentication will be using JWT/cookies
  - [x] JWT and cookie should expire in 30 days
- [x] User registration
  - [x] Register user
  - [x] Once registered, a token will be sent along with a cookie
  - [x] Passwords must be hashed
- [x] User Logout
  - [x] Cookie will be sent to set token = none
- [] Get User
  - [] Route to get the currently logged in user (via token)
- [] Password Reset (Lost password)
  - [] User can request to reset password
  - [] A hashed token will be emailed to the users registered email address
  - [] A put request can me made to the regenerated url to reset password
  - [] The token will expire after 10 minutes
- [] Update user info
  - [] Authenticated user only
  - [] Seperate route to updated password
- [] User CRUD
  - [] Authenticated user only

### Security

- Encrypt passwords and reset tokens
- Prevent cross site scripting - xss
- Prevent NoSql injections
- Add a rate limit for requests of 100 requests per 10 minutes
- Protect against http param pollution
- Add headers for security (helmet)
- Use cors to make API public

### Documentation

- Use Postman to create documentation
- Use docgen to create HTML files from Postman
- Add HTML files as the / route for the api

### Deployment (Digital Ocean)

- Push to github
- Create a droplet
- Clone repo to server
- Use PM2 process manager
- Enable firewall (ufw) and open needed ports
- Create an NGINX reverse proxy for port 80
- Connect a domain name
- Install an SSL using lets Encrypt

### Code Related Suggestions

- NPM Scripts for dev and production env
- Config file for important constants
- Use controller methods with documented descriptions/routes
- Error handling middleware
- Authentication middleware for protecting routes and setting users roles
- Validation using Mongoose and no external libraries
- Use async/await (create middleware to clean up controller methods)
- Create a database seeder to import and destroy data
