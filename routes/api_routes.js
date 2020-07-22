//-----------
// EXPRESS Router and app
// ----------
const express = require("express");
const router = express.Router();
//const app = express();
//-----------
// DataHandler instance -- File operations.
// ----------
const DataHandler = require("../libs/data_ops");
const noteHandler = new DataHandler();

//-------
// ROUTING
//-------
router
  .route("/notes")
  .get((req, res) => {
    ////calling read data function from DataHandler class.
    ////receives a cb for async Call on fs.readFile()
    try {
      noteHandler.ReadDataFromFile((err, data) => {
        if (err) throw err; ////error received from DataHandler method
        res.send(data);
      });
    } catch (error) {
      console.error(error);
      res.send({ message: "ERROR Reading Data from File." });
    }
  })
  .post((req, res) => {
    //calling WriteDataToFile function from DataHandler
    //receives callback to handle data returned
    try {
      noteHandler.PrepDataToWrite(req.body, (err, data) => {
        if (err) throw err; ////error received from DataHandler method
        //sending data to WriteToFile function in DataHandler
        noteHandler.WriteToFile(data, (err, lastElem) => {
            if (err) throw err; ////error received from DataHandler method
            res.send(lastElem); //sending last element added to update FE.
        })
      });
    } catch (error) {
      console.error(error);
      res.send({ message: "ERROR Reading Data from File." });
    }
  });

//note ID - DELETE
router.route("/notes/:id").delete((req, res) => {
  res.send(`note with id ${req.params.id} has been deleted.`);
});

module.exports = router;
