const PORT = 5005;

import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

import connectiondb from "./db/mongoose.connection.js";
import Cohort from "./model/cohortsModel.js";
import Student from "./model/studentsModel.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* ======================
          HOME
====================== */

app.get("/", (req, res) => {
  res.json({
    message: "Cohort Tools API",
  });
});


/* ======================
          DOCS
====================== */

app.get("/docs", (req, res) => {
  try {
    res.sendFile(import.meta.dirname + "/views/docs.html");
  } catch (error) {
    res.status(500).json(error);
  }
});


/* ======================
      COHORT ROUTES
====================== */


// GET ALL COHORTS
app.get("/api/cohorts", async (req, res) => {
  try {

    const cohorts = await Cohort.find();

    res.status(200).json(cohorts);

  } catch (error) {

    res.status(500).json(error);

  }
});


// GET ONE COHORT
app.get("/api/cohorts/:cohortId", async (req, res) => {

  try {

    const { cohortId } = req.params;

    const cohort = await Cohort.findById(cohortId);


    if (!cohort) {

      return res.status(404).json({
        message: "Cohort not found",
      });

    }


    res.status(200).json(cohort);


  } catch (error) {

    res.status(500).json(error);

  }

});


// CREATE COHORT
app.post("/api/cohorts", async (req, res) => {

  try {

    const newCohort = await Cohort.create(req.body);

    res.status(201).json(newCohort);


  } catch (error) {

    console.error(error);

    res.status(500).json(error);

  }

});


// UPDATE COHORT
app.put("/api/cohorts/:cohortId", async (req, res) => {

  try {

    const { cohortId } = req.params;


    const updatedCohort = await Cohort.findByIdAndUpdate(
      cohortId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );


    if (!updatedCohort) {

      return res.status(404).json({
        message: "Cohort not found",
      });

    }


    res.status(200).json(updatedCohort);


  } catch (error) {

    console.error(error);

    res.status(500).json(error);

  }

});


// DELETE COHORT
app.delete("/api/cohorts/:cohortId", async (req, res) => {

  try {

    const { cohortId } = req.params;


    const deletedCohort = await Cohort.findByIdAndDelete(cohortId);


    if (!deletedCohort) {

      return res.status(404).json({
        message: "Cohort not found",
      });

    }


    res.status(200).json({

      message: "Cohort deleted successfully",

      deletedCohort,

    });


  } catch (error) {

    console.error(error);

    res.status(500).json(error);

  }

});



/* ======================
      STUDENT ROUTES
====================== */


// GET ALL STUDENTS
app.get("/api/students", async (req, res) => {

  try {

    const students = await Student.find();

    res.status(200).json(students);


  } catch (error) {

    res.status(500).json(error);

  }

});


// GET ONE STUDENT
app.get("/api/students/:studentId", async (req, res) => {

  try {

    const { studentId } = req.params;


    const student = await Student.findById(studentId);


    if (!student) {

      return res.status(404).json({

        message: "Student not found",

      });

    }


    res.status(200).json(student);


  } catch (error) {

    console.error(error);

    res.status(500).json(error);

  }

});


// CREATE STUDENT
app.post("/api/students", async (req, res) => {

  try {

    const newStudent = await Student.create(req.body);


    res.status(201).json(newStudent);


  } catch (error) {

    console.error(error);

    res.status(500).json(error);

  }

});


// UPDATE STUDENT
app.put("/api/students/:studentId", async (req, res) => {

  try {

    const { studentId } = req.params;


    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );


    if (!updatedStudent) {

      return res.status(404).json({

        message: "Student not found",

      });

    }


    res.status(200).json(updatedStudent);


  } catch (error) {

    console.error(error);

    res.status(500).json(error);

  }

});


// DELETE STUDENT
app.delete("/api/students/:studentId", async (req, res) => {

  try {

    const { studentId } = req.params;


    const deletedStudent = await Student.findByIdAndDelete(studentId);


    if (!deletedStudent) {

      return res.status(404).json({

        message: "Student not found",

      });

    }


    res.status(200).json({

      message: "Student deleted successfully",

      deletedStudent,

    });


  } catch (error) {

    console.error(error);

    res.status(500).json(error);

  }

});



/* ======================
          STATUS
====================== */

app.get("/api/status", (req, res) => {

  res.status(200).json({

    status: "API running",

    port: PORT,

    timestamp: new Date(),

  });

});



/* ======================
        404 ROUTE
====================== */

app.use((req, res) => {

  res.status(404).json({

    message: "Route not found",

  });

});



/* ======================
      START SERVER
====================== */

connectiondb()

  .then(() => {

    console.log("Connected to MongoDB");


    app.listen(PORT, () => {

      console.log(`Server listening on port ${PORT}`);

    });

  })

  .catch((error) => {

    console.log(error);

  });