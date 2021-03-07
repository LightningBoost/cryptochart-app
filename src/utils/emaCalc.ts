const EMACalc = (mArray: Array<number>, mRange: number): Array<number> => {
  const k = 2 / (mRange + 1);
  // first item is just the same as the first item in the input
  const emaArray = [mArray[0]];
  // for the rest of the items, they are computed with the previous one
  for (let i = 1; i < mArray.length; i += 1) {
    emaArray.push(mArray[i] * k + emaArray[i - 1] * (1 - k));
  }
  return emaArray;
};

export default EMACalc;
