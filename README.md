# NOTE TAKER

## Description

An application that can be used to write, save, and delete notes. This application will use an express backend and save and retrieve note data from a JSON file.

* The following API routes are available:

  * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.

  * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

  * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

## App Deployment

This app is also deployed in Heroku. Here is the link:
https://dry-meadow-67885.herokuapp.com/

## Table of Content

- [Installation](#Installation)
- [Contributing](#Contributing)
- [License](#License)
- [Questions](#Questions)

## Installation

`Node JS` is required. Node Packages: `express` and `nodemon` as devDependency. Below the steps to get the app working locally:

1. Clone repo.
2. Browse to repo folder and open CLI or Terminal
3. Run `npm install` to download necessary node modules
4. Run the App with `npm start` (or `npm run dev` for dev. execution.)

The notes will be saved in a `db.json` file.

## Contributing
None at the moment.

## License
MIT


## Questions
Want to get in touch? Github: arielcc88
Report bugs and enhancements to: arielcc88@gmail.com
