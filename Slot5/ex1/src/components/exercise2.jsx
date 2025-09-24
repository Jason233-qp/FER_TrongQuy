export function Exercise2() {
    //1. Tạo 1 mang các số nguyên, in ra danh sách list
    const numbers = [1, 12, -3, 4, 15, 20, -10, 8, 7, 6];

    //2. Tính tổng các phần tử trong mảng
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);

    //3. Trung bình cộng các phần tử trong mảng
    const average = sum / numbers.length;

    //4.Khai báo mảng chuỗi names, in ra danh sách các tên theo thứ tự bảng chữ cái
    const names = ["John", "Jane", "Alice", "Bob", "Charlie", "Eve", "David", "Frank", "Grace", "Hannah"];

    //5. Khai báo một mảng Students, mỗi phần tử là một object gồm các thuộc tính: id, name, age, grade 
    //(id là số nguyên, name là chuỗi, age là số nguyên, grade là số thực). 
    //In ra danh sách các sinh viên có grade >= 7.5 (đầy đủ thuộc tính) xếp theo thứ tự giảm dần của grade
    const students = [
        { id: 1, name: "John", age: 20, grade: 8.5 },
        { id: 2, name: "Jane", age: 22, grade: 7.0 },
        { id: 3, name: "Alice", age: 21, grade: 9.0 },
        { id: 4, name: "Bob", age: 23, grade: 6.5 },
        { id: 5, name: "Charlie", age: 19, grade: 7.5 },
        { id: 6, name: "Eve", age: 20, grade: 8.0 },
        { id: 7, name: "David", age: 22, grade: 6.0 },
        { id: 8, name: "Frank", age: 21, grade: 7.8 },
        { id: 9, name: "Grace", age: 23, grade: 9.5 },
        { id: 10, name: "Hannah", age: 19, grade: 8.2 }
    ];
    //Hiển thị lại kết quả dưới dạng bảng. Thêm một hàng cuối trong bảng hiển thị điểm trung bình của các sinh viên có grade >= 7.5

    return (
        <>
            <h2>Exercise 2</h2>
            <p>1. Danh sách các số nguyên:</p>
            <ul>
                {numbers.map((num, index) => (
                    <li key={index}>Phần tử thứ {index + 1}: {num}</li>
                ))}
            </ul>
            <p>2. Tổng các phần tử trong mảng: {sum}</p>
            <p>3. Trung bình cộng các phần tử trong mảng: {average.toFixed(2)}</p>
            <p>4. Danh sách các tên theo thứ tự bảng chữ cái:</p>
            <ul>
                {names.sort().map((name, index) => (
                    <li key={index}>{name}</li>
                ))}
            </ul>
            <p>5. Danh sách các sinh viên có grade &gt;= 7.5 xếp theo thứ tự giảm dần của grade:</p>
            <ul>
                {students.filter(student => student.grade >= 7.5).sort((a, b) => b.grade - a.grade).map((student) => (
                    <li key={student.id}>ID: {student   .id}, Name: {student.name}, Age: {student.age}, Grade: {student.grade}</li>
                ))}
            </ul>
            <p>Hiển thị lại kết quả dưới dạng bảng:</p>
            <table border="1" cellPadding="5">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Tuổi</th>
                        <th>Điểm</th>
                    </tr>
                </thead>
                <tbody>
                    {students.filter(student => student.grade >= 7.5).sort((a, b) => b.grade - a.grade).map((student, index) => (
                            <tr key={student.id}>
                            <td>{index + 1}</td>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.grade}</td>
                        </tr>
                    ))}
                </tbody>    
                <tfoot> 
                    <tr>
                        <td colSpan="4"><strong>Điểm trung bình</strong></td>
                        <td>{(students.filter(student => student.grade >= 7.5).reduce((acc, curr) => acc + curr.grade, 0) / students.filter(student => student.grade >= 7.5).length).toFixed(2)}</td>
                    </tr>
                </tfoot>
            </table>
        </>
    );
}   