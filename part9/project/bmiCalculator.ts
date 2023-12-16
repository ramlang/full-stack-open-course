interface Metrics {
  weight: number;
  height: number;
}

function parseArguments(arg: Array<string>): Metrics {
  if (arg.length > 4) throw new Error('Too many arguments');
  if (arg.length < 4) throw new Error('Not enough arguments');

  const height = Number(arg[2]);
  const weight = Number(arg[3]);

  if (height === 0) {
    throw new Error("Cannot divide by zero :(");
  } else if (!isNaN(height) && !isNaN(weight)) {
    return { height, weight }
  } else {
    throw new Error("You didn't provide numbers :(");
  }
}

function calculateBmi(height: number, weight: number): string {
  const bmi = (weight / (height/100)**2);

  if (bmi < 16) {
    return 'Underweight (severe thinness)';
  } else if (bmi < 16.9) {
    return 'Underweight (moderate thinness)';
  } else if (bmi < 18.4) {
    return 'Underweight (mild thinnness)';
  } else if (bmi < 24.9) {
    return 'Normal range';
  } else if (bmi < 29.9) {
    return 'Overweight (Pre-obese)';
  } else if (bmi < 34.9) {
    return 'Obese (Class I)';
  } else if (bmi < 39.9) {
    return 'Obeses (Class II)';
  } else {
    return 'Obese (Class III)'
  }
}

// try {
//   const {height, weight} = parseArguments(process.argv);
//   console.log(calculateBmi(height, weight));
// } catch (error: unknown) {
//   if (error instanceof Error) {
//     console.log(error.message);
//   }
// }

// console.log(calculateBmi(180, 74));
export { parseArguments, calculateBmi }