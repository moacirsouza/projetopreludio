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
