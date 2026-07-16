import mongoose from "mongoose";

const StudentSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    linkedinUrl: { type: String, required: true, unique: true },
    languages: {
      type: [String],
      required: true,
      enum: [
        "English",
        "Dutch",
        "Portuguese",
        "French",
        "Spanish",
        "German",
        "Other",
      ],
    },
    program: {
      type: String,
      required: true,
      enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
    },
    background: { type: String },
    image: { type: String },
    cohort: { type: mongoose.Schema.Types.ObjectId, ref: "Cohorts" },
    projects: { type: [String] },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Student", StudentSchema);

/* 
The rule, always:
javascriptmongoose.model("Student", StudentSchema)   →  collection: students
mongoose.model("Cohort", CohortSchema)     →  collection: cohorts
mongoose.model("Book", BookSchema)         →  collection: books
mongoose.model("Category", CategorySchema) →  collection: categories  (handles irregular plurals too)
mongoose.model("Person", PersonSchema)     →  collection: people      (yes, even this one)
Mongoose uses a pluralization library under the hood, so it correctly handles most English pluralization rules (including trickier ones like "category" → "categories" or "person" → "people"), not just adding an "s."
This only happens automatically — you never write the collection name yourself unless you want to override it. If you ever do need a custom collection name (e.g. connecting to an existing collection with a name that doesn't fit the convention, like your earlier Cohorts/Students capital-letter situation), you can force it with a third argument:
javascriptmongoose.model("Student", StudentSchema, "Students") // forces collection name to "Students"
This is exactly the kind of situation you hit — your data was seeded into capitalized collection names (Cohorts, Students), which don't match Mongoose's automatic lowercase convention. You had two options for fixing that mismatch: rename the collections to match Mongoose's expectation (what we did), or pass the actual collection name explicitly as that third argument instead of renaming anything. Both approaches work — renaming is generally preferred since it keeps things following convention and avoids confusion for anyone else reading the code later.
*/