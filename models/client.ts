import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  phone: String,
  birthdate: String,
  gender: String,
  role: { type: String, default: "Patient" },
}, { timestamps: true });

const Patient = mongoose.models.Patient || mongoose.model("Patient", patientSchema);
export default Patient;
