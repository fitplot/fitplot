import _ from 'lodash';

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
    const [numberOfSets, volumeAndAmount] = input.split(MULTI_SET_DELIM);
    const [singleOrMultiVolume, singleOrMultiAmount] =
      volumeAndAmount.split(AMOUNT_DELIM);

    const isMultiAmount =
      Boolean(singleOrMultiAmount) &&
      singleOrMultiAmount.includes(MULTI_AMOUNT_DELIM);
    let amounts = [];
    if (isMultiAmount) {
      amounts = singleOrMultiAmount.split(MULTI_AMOUNT_DELIM);
    }

    const isMultiVolume =
      Boolean(singleOrMultiVolume) &&
      singleOrMultiVolume.includes(MULTI_AMOUNT_DELIM);
    let volumes = [];
    if (isMultiVolume) {
      volumes = singleOrMultiVolume.split(MULTI_AMOUNT_DELIM);
    }

    let count = 0;
    while (count < numberOfSets) {
      const amount = isMultiAmount ? amounts[count] : singleOrMultiAmount;
      const volume = isMultiVolume ? volumes[count] : singleOrMultiVolume;

      sets.push({
        amount: amount ? Number.parseInt(amount, 10) : null,
        volume: volume ? Number.parseInt(volume, 10) : null,
        ...base,
      });

      count += 1;
    }
  } else {
    for (const volumeAndAmount of input.split(SET_DELIM)) {
      let [volume, amount] = volumeAndAmount.split(AMOUNT_DELIM);

      if (amount === undefined) {
        // swap string split if only 'amount' is entered instead of 'volume@amount'
        amount = volume;
        volume = null;
      }

      sets.push({
        amount: amount ? Number.parseInt(amount, 10) : null,
        volume: volume ? Number.parseInt(volume, 10) : 1,
        ...base,
      });
    }
  }

  return sets;
}

function from(sets = []) {
  if (!Array.isArray(sets) && typeof sets === 'object') sets = [sets];
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

  const volumeAndAmount = [volume, amount]
    .filter((x) => !_.isNil(x))
    .join(AMOUNT_DELIM);

  if (sets.length < 2) return volumeAndAmount;

  return [sets.length, volumeAndAmount].join(MULTI_SET_DELIM);
}

fitcode.from = from;
export default fitcode;
