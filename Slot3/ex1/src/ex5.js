const people = [
	{ name: 'Ann', age: 19 },
	{ name: 'Bob', age: 15 },
	{ name: 'Cindy', age: 22 },
	{ name: 'David', age: 13 },
	{ name: 'Emma', age: 17 }
];

people
	.filter(person => person.age >= 13 && person.age <= 19)
	.map(person => `${person.name} (${person.age})`)
	.forEach(str => console.log(str));