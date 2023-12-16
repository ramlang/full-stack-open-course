import { NewPatient, Gender } from "./types";

const toNewPatient = (object: unknown): NewPatient => {
  // if the object is undefined or isn't an object throw error
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  // If properties exist on the object then parse the values for valid data
  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object &&
      'gender' in object && 'occupation' in object) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };

    return newPatient;
  }

  // the object is provided, but not all fields exists on object
  throw new Error('Incorrect data: some fields are missing');
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

// const isEntriesWithoutId = (param: unknown): param is Array<EntryWithoutId> => {
//   if (Array.isArray(param)) {
//     return param.every(elem => isEntryWithoutId(elem));
//   }

//   return false;
// };

// const isEntryWithoutId = (param: unknown): param is EntryWithoutId => {
//   const types = ["OccupationalHealthcare", "Hospital", "HealthCheck"];
//   if (param && typeof param === 'object' && 'type' in param) {
//     if (typeof param.type === 'string') {
//       return types.includes(param.type);
//     }
//   }
//   return false;
// };

// const parseEntries = (entries: unknown): Array<EntryWithoutId> => {
//   if (!isEntriesWithoutId(entries)) {
//     throw new Error('Incorrect or missing entries');
//   }

//   return entries;
// };

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};


export default toNewPatient;