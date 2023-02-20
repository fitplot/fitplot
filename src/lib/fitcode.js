const SET_DELIM = ',';
const MULTI_SET_DELIM = 'x';
const AMOUNT_DELIM = '@';
const MULTI_AMOUNT_DELIM = '/';

function fitcode(rawInput = '', base = {}) {
  const input = rawInput.replace(' ', '').toLowerCase();

  if (!input) return [];

  const sets = [];

  const isMultiSet = input.includes(MULTI_SET_DELIM);
  if (isMultiSet) {
    const split = input.split(MULTI_SET_DELIM);
    const numberOfSets = split[0];
    const volumeAndAmount = split[1];
    const [volume, amount] = volumeAndAmount.split(AMOUNT_DELIM);

    const isMultiAmount = amount?.includes(MULTI_AMOUNT_DELIM);
    let amounts = [];
    if (isMultiAmount) {
      amounts = amount.split(MULTI_AMOUNT_DELIM);
    }

    let count = 0;
    while (count < numberOfSets) {
      sets.push({
        volume: volume || null,
        amount: (isMultiAmount ? amounts[count] : amount) || null,
        unit: 'lbs',
        ...base,
      });
      count += 1;
    }
  } else {
    input.split(SET_DELIM).forEach((volumeAndAmount) => {
      let [volume, amount] = volumeAndAmount.split(AMOUNT_DELIM);

      if (amount === undefined) {
        // swap string split if only 'amount' is entered instead of 'volume@amount'
        amount = volume;
        volume = null;
      }

      sets.push({
        volume,
        amount,
        unit: 'lbs',
        ...base,
      });
    });
  }

  return sets;
}

function from(sets = []) {
  if (sets.length === 0) return null;

  const volumes = sets.map(({ volume }) => volume);
  const isVariableVolume = !volumes.every((volume) => volume === volumes[0]);
  const volume = isVariableVolume
    ? volumes.join(MULTI_AMOUNT_DELIM)
    : volumes[0];

  const amounts = sets.map(({ amount }) => amount);
  const isVariableAmount = !amounts.every((amount) => amount === amounts[0]);
  const amount = isVariableAmount
    ? amounts.join(MULTI_AMOUNT_DELIM)
    : amounts[0];

  const volumeAndAmount = [volume, amount].join(AMOUNT_DELIM);

  if (sets.length < 2) return volumeAndAmount;

  return [sets.length, volumeAndAmount].join(MULTI_SET_DELIM);
}

fitcode.from = from;
export default fitcode;
