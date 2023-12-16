import express from 'express';
import { calculateBmi } from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express()

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const queryString = JSON.parse(JSON.stringify(req.query));
  const height = queryString.height;
  const weight = queryString.weight;

  try {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.send({
      weight,
      height,
      bmi
    })
  } catch (error) {
    res.send(JSON.stringify({
      error: `malformatted parameters: ${error.message}`
    }))
  }
})

app.post('/exercises',((req, res) => {
  const arr: Array<number> = req.body.daily_exercises;
  const tar: number = Number(req.body.target);

  if (Array.isArray(arr) && !isNaN(tar)) {
    const results = calculateExercises(arr, tar);
    res.send(results);
  } else if (arr === undefined || req.body.target === undefined) {
    res.send({
      error: "parameters missing",
    })
  } else {
    res.send({
      error: "malformatted parameters",
    })
  }
}))

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})