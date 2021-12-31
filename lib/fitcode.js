const SET_DELIM = ",";
const MULTI_SET_DELIM = "x";
const AMOUNT_DELIM = "@";
const MULTI_AMOUNT_DELIM = "/";

export function fitcode(rawInput = "") {
  const input = rawInput.replace(" ", "").toLowerCase();

  if (!input) return null;

  const sets = [];

  const isMultiSet = input.includes(MULTI_SET_DELIM);
  if (isMultiSet) {
    const [numberOfSets, volumeAndAmount] = input.split(MULTI_SET_DELIM);
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
        unit: "lbs",
      });
      count++;
    }
  } else {
    input.split(SET_DELIM).forEach((volumeAndAmount) => {
      const [volume, amount] = volumeAndAmount.split(AMOUNT_DELIM);

      sets.push({
        volume: volume || null,
        amount: amount || null,
        unit: "lbs",
      });
    });
  }

  return sets;
}
