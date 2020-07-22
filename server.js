/**
 * --------------------------
 * SETTING UP EXPRESS
 * --------------------------
 */
const express = require("express");
const PORT = process.env.PORT || 8080;
//express instance: app
const app = express();

/**
 * --------------------------
 * NODE PATH
 * --------------------------
 */
const path = require("path");

/**
 * --------------------------
 * ROUTER & ROUTES
 * --------------------------
 */
//calling in the routers
const r_api = require("./routes/api_routes");
const r_notes = require("./routes/notes");
//defining middleware for static resources: CSS, Images and JS from Public
app.use(express.static(path.join(__dirname, "/public")));
//defining base route for /api using middleware
app.use("/api", r_api);
//middleware for /notes route
app.use("/notes", r_notes);
//route for root/* stays in main app. (any not recognized URI requested will return index page)
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

/**
 * --------------------------
 * SERVER LISTENING
 * --------------------------
 */
app.listen(PORT, (err) => {
  if (err) {
    return console.error("ERROR", err);
  }
  //listening notification
  console.log(`Server Initiated. Listening on http://localhost:${PORT}`);
});
