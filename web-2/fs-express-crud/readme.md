# Todo API

This is a simple Node.js-based Todo API built with Express.js that allows you to manage your todos.

## Features

- **Create a Todo**: Add a new todo with a title and description.
- **Retrieve Todos**: Fetch all todos or a specific todo by its ID.
- **Update a Todo**: Update the title, description, or completion status of an existing todo.
- **Delete a Todo**: Remove a todo by its ID.

## Endpoints

### Base URL

`http://localhost:3000`

### Routes

1. **GET /**

   - **Description**: Test endpoint to verify the server is running.
   - **Response**: `{ "message": "Hello World" }`

2. **POST /todos**

   - **Description**: Create a new todo.
   - **Request Body** (JSON):
     ```json
     {
       "title": "Sample Todo",
       "description": "This is a sample description"
     }
     ```
   - **Response**: Returns the newly created todo.

3. **GET /todos**

   - **Description**: Retrieve all todos.
   - **Response**: List of todos.

4. **GET /todos/:todoId**

   - **Description**: Retrieve a specific todo by its ID.
   - **Response**: The todo object.

5. **PATCH /todos/:todoId**

   - **Description**: Update a todo by its ID.
   - **Request Body** (Optional fields):
     ```json
     {
       "title": "Updated Title",
       "description": "Updated Description",
       "isCompleted": true
     }
     ```
   - **Response**: Updated todo object.

6. **DELETE /todos/:todoId**
   - **Description**: Delete a specific todo by its ID.
   - **Response**: `{ "message": "todo deleted successfully" }`

## Setup

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
