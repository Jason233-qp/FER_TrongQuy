// Hàm sum
function sum(...nums) {
  return nums.reduce((acc, x) => {
    if (typeof x === 'number' && !isNaN(x)) return acc + x;
    return acc;
  }, 0);
}

// Hàm avg
function avg(...nums) {
  const validNums = nums.filter(x => typeof x === 'number' && !isNaN(x));
  if (validNums.length === 0) return 0;
  const total = validNums.reduce((acc, x) => acc + x, 0);
  return +(total / validNums.length).toFixed(2);
}


console.log(sum(1,2,3));        
console.log(sum(1,'x',4));      
console.log(avg(1,2,3,4));      
console.log(avg());             