import data from '../../data/diagnoses';

import { Diagnosis } from '../types';

const getDiagnoses = (): Array<Diagnosis> => {
  return data;
};

export default {
  getDiagnoses,
};