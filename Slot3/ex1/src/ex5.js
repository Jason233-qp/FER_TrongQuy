const people = [
	{ name: 'Ann', age: 19 },
	{ name: 'Bob', age: 15 },
	{ name: 'Cindy', age: 22 },
	{ name: 'David', age: 13 },
	{ name: 'Emma', age: 17 }
];

const firstTwoTeen = people
	.filter(person => person.age >= 13 && person.age <= 19)
	.slice(0, 2);
firstTwoTeen.forEach(p => console.log(`${p.name} (${p.age})`));

people
	.filter(person => person.age >= 13 && person.age <= 19)
	.map(person => `${person.name} (${person.age})`)
	.forEach(str => console.log(str));
	
people
	.filter(person => person.age >= 13 && person.age <= 19)
	.sort((a, b) => a.name.localeCompare(b.name))
	.map(person => `${person.name} (${person.age})`)
	.forEach(str => console.log(str));


	