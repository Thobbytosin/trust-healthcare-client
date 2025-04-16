import { create } from "zustand";
import { IDoctorFree } from "../components/home/MeetDoctors";

interface Review {
  patientId: number;
  comment: string;
  rating: number;
  date: Date;
}

interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  doctor: IDoctor;
  patient: any;
  bookingDate: Date;
  appointmentDate: Date;
  appointmentStartTime: Date;
  appointmentEndTime: Date;
  status:
    | "Pending"
    | "Confirmed"
    | "Cancelled"
    | "Completed"
    | "Rescheduled"
    | "No-Show";
  appointmentType:
    | "Consultation"
    | "Follow-up"
    | "Check-up"
    | "Emergency"
    | "Routine";
  reason: string;
  notes?: string;
  isPaid: boolean;
  transactionId?: string;
  transaction?: any;
  meetingLink?: string; // For virtual appointments
  isFollowUpRequired: boolean;
  followUpDate?: Date;
  doctorCancellationReason?: string;
  patientCancellationReason?: string;
  reminderSentCount: number;
}

export interface IDoctor {
  id: string;
  name: string;
  email: string;
  securityQuestion: string;
  securityAnswer: string;
  specialization: string[];
  workExperience: { hospital: string; role: string; duration: string }[];
  yearsOfExperience: number;
  education: string[];
  hospital: string;
  clinicAddress: string;
  licenseNumber: string;
  certifications: string[];
  availableDays: string[];
  timeSlots: { [key: string]: string[] };
  holidays?: Date[];
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  altPhone?: string;
  ratings?: number;
  reviews?: Review[];
  appointments?: Appointment[];
  maxPatientsPerDay: number;
  about: string;
  thumbnail: { id: string; url: string };
  image: string;
  verificationStatus: "Processing" | "Verified" | "Failed";
  uploadedBy: "user" | "admin";
  userId: string;
  available: boolean;
}

interface DoctorsState {
  doctors: IDoctor[];
  doctorsFree: IDoctorFree[];
  setDoctors: (doctors: IDoctor[]) => void;
  setDoctorsFree: (doctors: IDoctorFree[]) => void;
}

export const useDoctorsStore = create<DoctorsState>((set) => ({
  doctors: [],
  doctorsFree: [],
  setDoctors: (doctors) => set({ doctors }),
  setDoctorsFree: (doctorsFree) => set({ doctorsFree }),
}));
