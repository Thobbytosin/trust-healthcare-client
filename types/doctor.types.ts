// TYPES

export type TDoctor = {
  id: string;
  name: string;
  specialization: string[];
  yearsOfExperience: number;
  city: string;
  state: string;
  ratings: number;
  about: string;
  image: string;
  verificationStatus: string;
  uploadedById: string;
  available: boolean;
  availableDays: string[];
  workExperience: { hospital: string; role: string; duration: string }[];
  education: { institution: string; graduationYear: string; course: string }[];
  hospital: { name: string; address: string }[];
  certifications: string[];
};

export type TDoctorsData = {
  doctors: TDoctor[];
  resultsPerPage: number;
  totalPages: number;
  page: number;
  limit: number;
  results: number;
};

export type TAvailableSlots = {
  day: string;
  slots: { label: string; availableSlots: string[] }[] | [];
};

// INTERFACE
// backend responses

export interface IDoctorsUnauthResponse {
  success: true;
  message: string;
  data: TDoctor[];
  statusCode: number;
}

export interface IDoctorResponse {
  success: true;
  message: string;
  data: TDoctor;
  statusCode: number;
}
