const person = {
  name: "Costas",
  address: {
    street: "Lalaland 12"
  }
};

// Dùng destructuring để lấy street, city 
const { address: { street, city = "Unknown City" } } = person;

console.log(street);
console.log(city);    