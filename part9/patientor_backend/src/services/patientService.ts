import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { NonConfidentialPatient, NewPatient, Patient } from '../types';

const getAllPatients = (): Array<NonConfidentialPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const id = uuid();
  const newPatient = {
    id,
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  return  patients.find((patient) => {
    return id === patient.id;
  });
};

export default {
  getAllPatients,
  addPatient,
  findById,
};