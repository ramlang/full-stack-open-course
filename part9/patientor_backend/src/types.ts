interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other'
}

enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface Discharge {
  date: string;
  criteria: string;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

type NonConfidentialPatient = Omit<Patient, 'ssn' | 'entries'>;

type NewPatient = Omit<Patient, 'id'>;

type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

// Define Entry without the 'id' property
type EntryWithoutId = UnionOmit<Entry, 'id'>;

export {
  Diagnosis,
  Gender,
  HealthCheckRating,
  Patient,
  NonConfidentialPatient,
  NewPatient,
  Entry,
  EntryWithoutId,
};