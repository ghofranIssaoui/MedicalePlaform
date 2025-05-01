// ! lib = backend
//! responsable 3al crud ta3 e doctor +tnajem tzid ay interaction m3a etab doctors lehne

// import { connectDB } from './db';
// import { Doctor } from '@/models/doctor';
// import { DoctorType } from '@/types/doctor';
// import mongoose from 'mongoose';

// export const getDoctorById = async (id: string): Promise<DoctorType> => {a
//   try {
//     await connectDB();
//     const doctor = await Doctor.findById(id).lean();
//     if (!doctor) {
//       throw new Error(`Doctor with id ${id} not found`);
//     }
//     return doctor as unknown as DoctorType;
//   } catch (error) {
//     console.error('❌ Error fetching doctor by ID:', error);
//     throw new Error('Failed to fetch doctor data');
//   }
// };

// export const getAllDoctors = async (specialty?: string): Promise<DoctorType[]> => {
//   try {
//     await connectDB();

//     const filter = specialty ? { specialty } : {};
//     const doctors = await Doctor.find(filter).lean();
//     // console.log("ds:",doctors)

//     return doctors as unknown as DoctorType[];
//   } catch (error) {
//     console.error('❌ Error fetching doctors:', error);
//     throw new Error('Failed to fetch doctors');
//   }
// };


// export const createDoctor = async (doctorData: Partial<DoctorType>): Promise<DoctorType> => {
//   try {
//     await connectDB();
//     const newDoctor = new Doctor(doctorData);
//     const savedDoctor = await newDoctor.save();
//     console.log("saved")
//     return savedDoctor.toObject() as DoctorType;
//   } catch (error) {
//     console.error('❌ Error creating doctor:', error);
//     throw new Error('Failed to create doctor');
//   }
// };

// export const updateDoctor = async (id: string, updates: Partial<DoctorType>): Promise<DoctorType> => {
//   try {
//     await connectDB();
//     const updatedDoctor = await Doctor.findByIdAndUpdate(id, updates, { new: true }).lean();
//     if (!updatedDoctor) {
//       throw new Error(`Doctor with id ${id} not found`);
//     }
//     return updatedDoctor as unknown as DoctorType;
//   } catch (error) {
//     console.error('❌ Error updating doctor:', error);
//     throw new Error('Failed to update doctor');
//   }
// };

// export const deleteDoctor = async (id: string): Promise<{ success: boolean }> => {
//   try {
//     await connectDB();
//     const deletedDoctor = await Doctor.findByIdAndDelete(id);
//     if (!deletedDoctor) {
//       throw new Error(`Doctor with id ${id} not found`);
//     }
//     return { success: true };
//   } catch (error) {
//     console.error('❌ Error deleting doctor:', error);
//     throw new Error('Failed to delete doctor');
//   }
// };
