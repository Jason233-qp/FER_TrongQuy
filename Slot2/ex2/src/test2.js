const listInt = [1,2,3,4,5];
const listSquare = listInt.map(x=>x);
console.log(listSquare);

listInt.filter(x=>x%2 ===0).forEach(x=>console.log(x));

const sum = listInt.reduce((acc, x) => acc+x,0);
console.log(sum);

const people = [
	{ id: 1, name: 'Alice', age: 22 },
	{ id: 2, name: 'Bob', age: 19 },
	{ id: 3, name: 'Charlie', age: 25 },
	{ id: 4, name: 'David', age: 18 }
];

people.forEach(person => {
	console.log(`ID: ${person.id}, Name: ${person.name}, Age: ${person.age}`);
});

people.forEach(person => {
	if (person.age > 20) {
		console.log(`Age > 20: ID: ${person.id}, Name: ${person.name}, Age: ${person.age}`);
	}
});
