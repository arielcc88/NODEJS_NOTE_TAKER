//including path
const path = require("path");
const fs = require("fs");
const fileName = "../db/db.json";

class DataHandler {
  constructor() {
    this.file_path = path.join(__dirname, fileName);
  }

  //getter
  getFilePath() {
    return this.file_path;
  }

  //method: check if file exist
  IsThereAFile() {
    try {
      return fs.existsSync(this.file_path);
    } catch (error) {
      console.error(error);
    }
  }

  // method: creates empty JSON file
  // to store Notes if file does not exist
  // using sync versions to ensure file is created
  // before start writing/reading to/from it
  CreateEmptyFile() {
    try {
      fs.closeSync(fs.openSync(this.file_path, "w"));
    } catch (error) {
      console.error("Error creating JSON file." + error);
    }
  }

  //method: read json data from file
  //receives callback function to process
  //data once async call is done
  ReadDataFromFile(cb) {
    if (this.IsThereAFile()) {
      ////check if file exists
      try {
        //async call to read file.
        fs.readFile(this.file_path, (err, data) => {
          if (err) throw err; //error to be handled in catch block and returned to cb
          ////if no error, cb receives null for error and data (if any)
          return data.length ? cb(null, JSON.parse(data)) : cb(null, []); // return empty array if no data
        });
      } catch (error) {
        console.error("ERROR", error);
        //return error, null for results.
        return cb(new Error(`ERROR: ${error}`), null);
      }
    } else {
      ////file not found
      return { message: "NO DATA" };
    }
  }

  /**
   * Class Method
   * Handles insertion of new Notes into JSON File
   * using 'fs'.
   */
  PrepDataToWrite(dataWrite, cb) {
    if (!this.IsThereAFile()) {
      ////check if file exists
      ////file not found. Application creates one
      ////on location defined = file_path
      this.CreateEmptyFile();
    }
    try {
      //read file to determine total number of notes existing
      this.ReadDataFromFile((err, dataRead) => {
        if (err) throw err;
        //the number of elements in JSON data + 1 = new Note's id.
        //dataWrite["id"] = (dataRead[dataRead.length - 1].id + 1);
        dataWrite["id"] = dataRead.length > 0 ? Math.max.apply(Math, dataRead.map(elem => {return elem.id})) + 1 : 1;
        //pushing new element to array
        dataRead.push(dataWrite);
        //returning data to callback
        return cb(null, dataRead); //this callback will call the WriteToFile function
      });
    } catch (error) {
      console.error("ERROR", error);
      //return error, null for results.
      return cb(new Error(`ERROR: ${error}`), null);
    }
  }

  // write to file had to be separate method
  // for async execution.
  WriteToFile(newData, cb) {
    try {
      fs.writeFile(this.file_path, JSON.stringify(newData), (err) => {
        if (err) throw err;
        //if writing passes
        return cb(null, newData);
      });
    } catch (error) {
      console.error("ERROR", error);
      //return error, null for results.
      return cb(new Error(`ERROR: ${error}`), null);
    }
  }

  //delete from file method
  //async execution
  DeleteFromFile(elemID, cb) {
    //returns modified array ready to be written
    try {
      //read file to determine total number of notes existing
      this.ReadDataFromFile((err, dataRead) => {
        if (err) throw err;
        //checking if data returned and elemID > 0
        if (dataRead.length > 0 && elemID > 0) {
            //finding and removing item with ID = elemID
            dataRead.forEach((element,index) => {
                if (element.id === parseInt(elemID)) {
                    dataRead.splice(index, 1);
                }
            });
        }
        //returning data to callback
        return cb(null, dataRead); //returning modified array to routes
      });
    } catch (error) {
      console.error("ERROR", error);
      //return error, null for results.
      return cb(new Error(`ERROR: ${error}`), null);
    }
  }
}

module.exports = DataHandler;
