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
        res.status(200).send(data);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "ERROR Reading Data from File." });
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
          res.status(200).send(lastElem[lastElem.length - 1]); //sending last element added to update FE.
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "ERROR Reading Data from File." });
    }
  });

//note ID - DELETE
router.route("/notes/:id").delete((req, res) => {
  try {
    noteHandler.DeleteFromFile(req.params.id, (err, modData) => {
      if (err) throw err;
      //sending data to WriteToFile function in DataHandler
      noteHandler.WriteToFile(modData, (err, allElem) => {
        if (err) throw err; ////error received from DataHandler method
        res.status(200).send(allElem); //success
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: `ERROR Deleting Note ID ${req.params.id}.` });
  }
});

module.exports = router;
