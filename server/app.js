const PORT = 5005;

import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";



import cohort from "./cohorts.json" with {type: "json"};
import students from "./students.json" with {type: "json"};
import connectiondb from "./db/mongoose.connection.js";
import Cohort from "./model/cohortsModel.js";
import Student from "./model/studentsModel.js";



// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173"
  }),
);


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

/* Cohorts Routes */
app.get("/docs", (req, res) => {
  try {
    res.sendFile(import.meta.dirname + "/views/docs.html");
  } catch (error) {
    res.status(500).json(error)
  }
  
});


app.get("/api/cohort", (req, res) => {
  
try {
  res.json(import.meta.resolve("./cohorts.json") );
} catch (error) {
  res.status(500).json(error)
}
  res.json(cohort);
});


app.get("/cohort", async (req, res) => {
  try {
    const cohort = await Cohort.find();
    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json(error);
  }
  
})

/* Students Routes */

app.get("/api/students", (req, res) => {

  try {
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json(error)
  }  
}); 


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  connectiondb();
});

