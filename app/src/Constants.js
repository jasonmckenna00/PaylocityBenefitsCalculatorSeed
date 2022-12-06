export const baseUrl = 'https://localhost:7124';

//ref: https://stackoverflow.com/a/55556258/725957
export const currencyFormat = (num) => {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export const dateFormat = (date) => {
  return date.split('T')[0]
}

export const relationshipMap = (code) => {
  switch(code){
    case 0:
      return 'None'
    case 1:
      return 'Spouse'
    case 2:
      return 'Domestic Partner'
    case 3:
      return 'Child'
    default: return 'None' 
  }
}
