// schema hiya strecture ta3 e tab doctors (DoctorSchema)
//wl model howa e type (Doctor)
import mongoose, { Schema, models, model } from 'mongoose';

const DoctorSchema = new Schema({
  name: String,
  specialty: String,
  subSpecialty: String,
  location: String,
  rating: Number,
  reviews: Number,
  image: String,
  about: String,
  education: [
    {
      degree: String,
      institution: String,
      year: String,
    },
  ],
  languages: [String],
  insurances: [String],
  availableDates: [
    {
      date: String,
      slots: [String],
    },
  ],
  consultationFee: Number,
});

export const Doctor = models.Doctor || model('Doctor', DoctorSchema);
