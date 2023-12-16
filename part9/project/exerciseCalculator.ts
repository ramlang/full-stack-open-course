// 9.2 Exercise calculator

// Create the code of this exercise in file exerciseCalculator.ts.

// Write a function calculateExercises that calculates the average time of daily exercise hours and compares it to the target amount of daily hours and returns an object that includes the following values:

//     the number of days
//     the number of training days
//     the original target value
//     the calculated average time
//     boolean value describing if the target was reached
//     a rating between the numbers 1-3 that tells how well the hours are met. You can decide on the metric on your own.
//     a text value explaining the rating, you can come up with the explanations

// The daily exercise hours are given to the function as an array that contains the number of exercise hours for each day in the training period. Eg. a week with 3 hours of training on Monday, none on Tuesday, 2 hours on Wednesday, 4.5 hours on Thursday and so on would be represented by the following array:

// [3, 0, 2, 4.5, 0, 3, 1]

// For the Result object, you should create an interface.

// Create an npm script, npm run calculateExercises, to call the function with hard-coded values.

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

// interface Info {
//   target: number;
//   values: Array<number>;
// }

// function parseArguments(arg: Array<string>): Info {
//   if (arg.length > 10) throw new Error('Too many arguments');
//   if (arg.length < 4) throw new Error('Not enough arguments');

//   const target = Number(arg[2]);
//   const values = arg.slice(3).map(n => Number(n));

//   console.log(target, values);
//   if (target === 0) {
//     throw new Error("What do you mean your target is zero? D:");
//   } else if (!isNaN(target) && Array.isArray(values)) {
//     return { target, values }
//   } else {
//     throw new Error("You didn't provide numbers :(");
//   }
// }

function calculateExercises(week: Array<number>, target: number): Result {
  const periodLength = week.length;
  const trainingDays = week.filter(n => n > 0).length;
  const average = week.reduce((acc, n) => acc + n) / periodLength;
  const success = target <= average ? true : false;
  const difference = average - target;
  const range = 2;
  let rating: 1 | 2 | 3;
  let ratingDescription;

// avg = 3
// targ = 5
// range = 2

/*
avg - targ
rang=2

avg % target = 3
3

avg=3
targ=5
diff=-2
=> rating 2

avg % target = 2
2

avg=2
targ=5
diff=-3
=> rating 1

avg % targt = 2
5

avg=7
targ=5
diff=2
=> rating 3

- negative difference = avg < targ
  - if abs(difference) greater than range
    - rating 1
  - if abs(difference) less or equal to range
    - rating 2

- positive difference = rating 3


TEST #1
avg: 2
target 5
range: 2

avg - targ = -3 (3)

TEST #2
avg: 4
target: 5
range: 2

avg - targ = -1 (1)


TEST 3

avg: 6
targ: 5
range: 2

rating 3

*/

  if (difference < 0) {
    if (Math.abs(difference) > range) {
      rating = 1;
      ratingDescription = 'Ya done goofed';
    } else {
      rating = 2;
      ratingDescription = 'Gotta get your shit together bro';
    }
  } else {
    rating = 3;
    ratingDescription = 'You are absolutely crushing it homie';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

// try {
//   const { target, values } = parseArguments(process.argv);
//   console.log(calculateExercises(values, target));
// } catch (error) {
//   if (error instanceof Error) {
//     console.log(error.message);
//   }
// }

// { periodLength: 7,
//   trainingDays: 5,
//   success: false,
//   rating: 2,
//   ratingDescription: 'not too bad but could be better',
//   target: 2,
//   average: 1.9285714285714286
// }

export default calculateExercises