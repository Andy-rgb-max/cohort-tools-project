import "dotenv/config";

import connectiondb from "../db/mongoose.connection.js";

import Cohort from "../model/cohortsModel.js";
import Student from "../model/studentsModel.js";

import cohorts from "../cohorts.json" with { type: "json" };
import students from "../students.json" with { type: "json" };

async function seedDatabase() {
  try {
    // Connect to the database
    await connectiondb();
    console.log("Connected to MongoDB");

    // Clear collections
    await Cohort.deleteMany({});
    await Student.deleteMany({});

    console.log("Collections cleaned.");

    // Remove the numeric _id from cohorts
    const cohortsWithoutId = cohorts.map((cohort) => {
      const { _id, ...rest } = cohort;
      return rest;
    });

    console.log("=== Cohorts to insert ===");
    console.log(cohortsWithoutId);

    // Insert cohorts
    const createdCohorts = await Cohort.insertMany(cohortsWithoutId);

    console.log(`${createdCohorts.length} cohorts inserted.`);

    // Create a mapping:
    // Old ID (1, 2, 3...) -> New ObjectId
    const cohortMap = {};

    cohorts.forEach((oldCohort, index) => {
      cohortMap[oldCohort._id] = createdCohorts[index]._id;
    });

    // Remove the _id from students and replace the numeric cohort ID with the corresponding ObjectId
    const studentsWithCorrectIds = students.map((student) => {
      const { _id, ...rest } = student;

      return {
        ...rest,
        cohort: cohortMap[student.cohort],
      };
    });

    console.log("=== Students to insert ===");
    console.log(studentsWithCorrectIds);

    // Insert students
    const createdStudents = await Student.insertMany(studentsWithCorrectIds);

    console.log(`${createdStudents.length} students inserted.`);

    console.log("Database seeded successfully!");

    process.exit(0);

  } catch (error) {
    console.error("Seed Error:");
    console.error(error);
    process.exit(1);
  }
}

seedDatabase();