export function Exercise1() {
    //1. Viết 2 arrow function: isdouble(n) và isEven(n)
    // Arrow function double: trả về n * 2
    const isdouble = n => n * 2;

    // Arrow function isEven: trả về true nếu n chẵn, false nếu n lẻ
    const isEven = n => n % 2 === 0;

    return (
        <>
            <h2>Exercise 1</h2>
            <p>1:</p>  
            <p>Kết quả isdouble(5): {isdouble(5)}</p>
            <p>Kết quả isEven(10): {isEven(10)? "Số chẵn" : "Số lẻ"}</p>
            <p>Kết quả isEven(7): {isEven(7) ? "Số chẵn" : "Số lẻ"}</p> 
        </>
    );
}
