# Backend Server for Slidely Task 2

This backend server is built using Express.js and TypeScript. It uses a JSON file to store submissions.

## Prerequisites

- Node.js
- npm (Node package manager)

## Installation and Running

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the server**:
    ```bash
    npx ts-node src/index.ts
    ```

The server will start running at `http://localhost:3000`.

## API Endpoints

- **GET /ping**: Returns true if the server is running.
- **POST /submit**: Submits a new form entry.
  - Parameters: `name`, `email`, `phone`, `github_link`, `stopwatch_time`
- **GET /read**: Reads a form entry by index.
  - Query parameter: `index`
- **PUT /update**: Updates an existing form entry by index.
  - Parameters: `index`, `name`, `email`, `phone`, `github_link`, `stopwatch_time`
- **DELETE /delete**: Deletes a form entry by index.
  - Query parameter: `index`

## Notes

- Ensure `db.json` is in the root directory as the database file.
- Modify `db.json` structure if necessary to suit your data requirements.
