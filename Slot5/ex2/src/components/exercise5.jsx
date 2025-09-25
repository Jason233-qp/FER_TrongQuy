export function Exercise5() {
    /*Mục tiêu: Kết hợp filter và map với arrow function.
    Yêu cầu:
    •	Cho mảng people (name, age).
    •	Lọc những người tuổi 13–19 (bao gồm 13 và 19).
    •	Map sang chuỗi "Ann (19)".
    •	In ra từng dòng.
    */
   const people = [
        { name: "John", age: 15 },
        { name: "Jane", age: 22 },
        { name: "Alice", age: 13 },
        { name: "Bob", age: 19 },
        { name: "Charlie", age: 25 },
        { name: "Eve", age: 17 },
        { name: "David", age: 30 },
        { name: "Frank", age: 14 },
        { name: "Grace", age: 18 },
        { name: "Hannah", age: 12 }
    ];
    return (
        <>
            <h2>Exercise 5</h2>
            {people
                .filter(person => person.age >= 13 && person.age <= 19)
                .map(person => (
                    <p key={person.name}>
                        {person.name} ({person.age})
                    </p>
                ))}
        </>
    );
}