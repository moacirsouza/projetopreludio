function getAverage(scores) {
  let average;
  let sumOfAllScores = 0;
  const totalScores = scores.length;

/*
  // Usando o for..of
  for (const score of scores) {
    sumOfAllScores += score;
  }
*/

/*
  // Usando o while
  while (scores.length > 0) {
    sumOfAllScores += scores.pop();
  }
*/

  // Usando o for
  for (let count = 0; count < totalScores; count++) {
    sumOfAllScores += scores[count];
  }

  average = sumOfAllScores / totalScores;

  return average;
}

console.log(getAverage([92, 88, 12, 77, 57, 100, 67, 38, 97, 89]));
console.log(getAverage([45, 87, 98, 100, 86, 94, 67, 88, 94, 95]));

function getAverage(scores) {
  let sum = 0;

  for (const score of scores) {
    sum += score;
  }

  return sum / scores.length;
}

function getGrade(score) {
  if (score === 100) {
    return "A++";
  } else if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    return "F";
  }
}

function hasPassingGrade(score) {
  return getGrade(score) !== "F";
}

function studentMsg(totalScores, studentScore) {
  let message, classAverage, studentGrade, result;

  classAverage = getAverage(totalScores);
  studentGrade = getGrade(studentScore);
  result = "failed";

  if (hasPassingGrade(studentScore)) {
    result = "passed";
  }

  message = "Class average: " + classAverage + 
            ". Your grade: "  + studentGrade + 
            ". You "          + result       + 
            " the course.";

  return message;
}

console.log(
  studentMsg(
    [92, 88, 12, 77, 57, 100, 67, 38, 97, 89],
    37
  )
);
