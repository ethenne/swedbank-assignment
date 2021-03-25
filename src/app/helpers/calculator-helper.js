export const periodOption = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
  '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
  '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];

export const interestOption = ['1', '1.5', '2', '2.5', '3', '3.5',
  '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5',
  '8', '8.5', '9', '9.5', '10'];

export const amount = (period, interest, loanAmount) => {
  const interestPercentage = interestOption[interest] / 100;
  const divider = (1+interestPercentage)*(periodOption[period]-1) || 1;
  const multiplier = interestPercentage + (interestPercentage/divider);
  const amount = loanAmount * multiplier;
  return amount.toFixed(2);
};

