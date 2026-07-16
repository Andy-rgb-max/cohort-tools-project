import { Schema, model } from "mongoose";

const CohortSchema = new Schema({
    cohortsSlug: {type: String},
    cohotName: {type: String},
    program: {type: String, enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"]},
    format: {type: String, enum: ["Full-time", "Part-time"]},
    campus: {type: String, enum: ["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "Lisbon", "Remote"]},
    startDate: {type: Date},
    endDate: {type: Date},
    inProgress: {type: Boolean},
    programManager: {type: String},
    leadTeacher: {type: String},
    totalHours: {type: Number}
},
{
    timestamps: true,
})


export default model("Cohort", CohortSchema);