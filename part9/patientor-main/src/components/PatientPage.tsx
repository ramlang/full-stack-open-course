import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, List, ListItemText } from '@mui/material';

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { Patient, Gender, Entry } from "../types";

import patientService from "../services/patients";

type PatientParams = {
  id: string;
};

const getGenderIcon = (gender: Gender) => {
  switch (gender) {
    case Gender.Female:
      return (<FemaleIcon fontSize='large'/>);
    case Gender.Male:
      return (<MaleIcon fontSize='large'/>);
    case Gender.Other:
      return (<TransgenderIcon fontSize='large'/>);
  }
};

const DiagnosisCodes = (entry: Entry) => {
  const codes = entry.diagnosisCodes;

  if (codes) {
    return (
      <List>
        {codes.map((code, index) => {
          return (
            <ListItemText key={index}>
              - {code}
            </ListItemText>
          );
        })}   
     </List>
    );
  } else {
    return (
      <List>
        <Typography>N/A</Typography>
      </List>
    );
  }
};

const Entries = ({ entries }: { entries: Entry[]}) => {  // type as Entry
  return (
    <List>
      <Typography variant='h5'>entries</Typography>
      {entries.map((entry, index) => {
        return (
          <ListItemText key={index}>
            {entry.date} {entry.description}
            <DiagnosisCodes {...entry} />
          </ListItemText>
        );
      })}
    </List>
  );
};

const PatientPage = () => {
  const id = useParams<PatientParams>().id;
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const patient = await patientService.getPatient(id);
        setPatient(patient);
      }
    };
    void fetchPatient();
  }, [id]);

  if (!patient) return null;

  return (
    <div className="App">
      <Box></Box>
      <Typography align="left" variant="h3">
        {patient.name}
      </Typography>
      {getGenderIcon(patient.gender)}
      <Typography align="left" variant="body1">
        {patient.ssn}
      </Typography>
      <Typography align="left" variant="body1">
        {patient.occupation}
      </Typography>
      <Entries entries={patient.entries} />
    </div>
  );
};

export default PatientPage;
