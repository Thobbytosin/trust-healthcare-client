// backend response type
export interface DoctorsBackendResponse {
  success: boolean;
  message: string;
  doctors: any[];
  resultsPerPage: number;
  totalPages: number;
  page: number;
  limit: number;
  results: number;
}

export interface DoctorBackendSuccessResponse {
  success: boolean;
  message: string;
  doctor: any;
}

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
  education: { institution: string; graduationYear: string; course: string }[];
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
  uploadedBy: "doctor" | "admin";
  uploadedById: string;
  available: boolean;
}
