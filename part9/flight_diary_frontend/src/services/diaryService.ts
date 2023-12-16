import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllEntries = () => {
  return axios
    .get<DiaryEntry[]>(baseUrl)
    .then(response => response.data);
}

// export const createEntry = (object: NewDiaryEntry) => {
//   return axios
//     .post<DiaryEntry>(baseUrl, object)
//     .then(response => response)
// }

export const createEntry = (object: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, object)
    .then(response => response.data)
    .catch(error => {
      if (axios.isAxiosError(error) || error !== undefined) {
        throw new Error(error.response.data);
      } else {
        throw new Error(error.response);
      }
    })
}

// catch (error) {
  //     if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
  //       console.log(error.status)
  //       console.error(error.response);
  //       // Do something with this error...
  //     } else {
  //       console.error(error);
  //     }
  //   }
