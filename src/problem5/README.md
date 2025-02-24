# Code Challenge: ExpressJS Backend Server with TypeScript

This project is a Code Challenge template requiring the development of a backend server using ExpressJS and TypeScript. The goal is to implement a CRUD interface that allows users to interact with the service while ensuring data persistence with a database.

## Challenge Requirements
1. **Interface Functionalities:**
    - Create a resource.
    - List resources with basic filters.
    - Get details of a resource.
    - Update resource details.
    - Delete a resource.
2. **Database Integration:**
    - Connect the backend service with a simple database for data persistence.
3. **Documentation:**
    - Provide a `README.md` with configuration details and instructions for running the application.

## Additional Feature: Live Scoreboard Update API
### Software Requirements
1. The website contains a scoreboard displaying the top 10 user scores.
2. The scoreboard must update live with new scores.
3. Users can perform an action that increases their score.
4. Upon completion, an API call will update the score on the server.
5. Prevent unauthorized users from tampering with scores.


## Prerequisites
To build and run this app locally, you will need:
- Install [Node.js](https://nodejs.org/en/)
- Install [MongoDB](https://docs.mongodb.com/manual/installation/)
- Install [VS Code](https://code.visualstudio.com/)

## Getting Started
- Clone the repository:
```sh
git clone <repository_url> <project_name>
```
- Install dependencies:
```sh
cd <project_name>
npm install
```
- Configure your MongoDB server:
```sh
# Create the database directory
sudo mkdir -p /data/db
# Give it the correct permissions
sudo chmod 777 /data/db

# On macOS 10.15+ create the directory under home
mkdir -p ~/data/db
```
- Start your MongoDB server:
```sh
mongod --dbpath ~/data/db
```
- Build and run the project:
```sh
npm run build
npm start
```

If using VS Code, you can run the default build task using `Cmd + Shift + B`, and then start the project using `Cmd + Shift + P`, selecting `Tasks: Run Task > npm: start`.

Finally, navigate to `http://localhost:3000` to access the API.

### API Specification
# API Service Module Specification

## Overview
The API service module is responsible for updating and maintaining the scoreboard with live score updates. It ensures that score updates are valid, secure, and reflect real user actions.

## Features & Requirements
1. **Scoreboard Display**: The API provides the top 10 users' scores.
2. **Live Updates**: When a user's score is updated, the scoreboard should reflect the changes in real-time.
3. **Action-based Scoring**: Users perform an action that triggers a score update via an API request.
4. **Security Measures**: Prevent unauthorized users from fraudulently increasing scores.

## API Endpoints
### 1. **Update Score**
**Endpoint:** `POST /api/score/update`

**Request:**
```json
{
  "user_id": "<USER_ID>",
  "action_id": "<ACTION_ID>",
  "auth_token": "<AUTH_TOKEN>"
}
```

**Response:**
```json
{
  "success": true,
  "new_score": 1200
}
```

**Processing Steps:**
1. Validate `auth_token` to ensure the request is from an authorized user.
2. Verify `action_id` to ensure the action is legitimate.
3. Calculate the new score.
4. Update the user's score in the database.
5. Push real-time update to the scoreboard service.

### 2. **Get Top Scores**
**Endpoint:** `GET /api/score/top`

**Response:**
```json
{
  "top_scores": [
    {"user_id": "user123", "score": 1500},
    {"user_id": "user456", "score": 1400}
  ]
}
```

## Security Measures
1. **Authentication & Authorization**: Use JWT or OAuth for `auth_token` validation.
2. **Action Validation**: Ensure each `action_id` is unique and corresponds to a real in-game action.
3. **Rate Limiting**: Implement rate limits to prevent spamming of score updates.
4. **Database Integrity Checks**: Prevent duplicate or tampered score submissions.
5. **Real-time Monitoring**: Log suspicious activities for further investigation.

## Execution Flow Diagram
```
User Action -> API Request (/api/score/update) -> Authenticate User -> Validate Action -> Update Database -> Notify Scoreboard -> Real-time Update
```

This module ensures secure and efficient live score updates while preventing unauthorized score tampering.



## Building the Project
This project uses TypeScript, requiring compilation before running. Build and watch tasks are available:
```sh
npm run build      # Compile TypeScript to JavaScript
npm run start      # Start the server
npm run watch      # Watch for file changes and recompile automatically
```

## Testing
Tests are written using Jest. Run them with:
```sh
npm run test
```

## Linting
Ensure code quality using ESLint:
```sh
npm run lint
```

## Project Structure
The project follows a structured architecture:
```
|-- src
    |-- controllers   # Express route handlers
    |-- models        # Database models
    |-- routes        # API route definitions
    |-- services      # Business logic and utilities
    |-- app.ts        # Main Express server entry point
```

