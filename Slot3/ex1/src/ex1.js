//double(7)
const double = (x) => x * 2;
console.log(double(7)); 

//Cách viết khác
//Có { } thì phải có return
//Không có { } thì không cần return
const double2 = (x) => { return x * 2; }
console.log(double2(7)); 
//--------------------------------------------------------------------

//isEven(7)
const isEven = (x) => { return x % 2 === 0; }
console.log(isEven(7)); 

//Cách viết khác
const isEven2 = (x) => x % 2 === 0;
console.log(isEven2(7)); 
//--------------------------------------------------------------------

//isEven(10)
const isEven3 = n => n % 2 === 0;
console.log(isEven3(10)); 

//cách viết khác với {return}
const isEven4 = (x) => { return x % 2 === 0; }
console.log(isEven4(10));

//cách viết khác với phương thức prototype
Number.prototype.isEven5 = function() { return this % 2 === 0; };
console.log((10).isEven5());

//dùng toán tử so sánh về giá trị boolean
const isEven6 = n => !(n % 2);
console.log(isEven6(10)); 