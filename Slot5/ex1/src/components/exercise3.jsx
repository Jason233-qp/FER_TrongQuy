export function Exercise3() {
    //Dùng destructuring để lấy street, city (mặc định "Unknown City" nếu không có).
    // In: street, city.
    // Ràng buộc: Không truy cập kiểu person.address.street trực tiếp.

    const person = {
        name: "Costas",
        address: {
            street: "Lalaland 12"
        }
    };

    return (
        <>
            <h2>Exercise 3</h2>
            <p>Địa chỉ:</p>
            <p>Street: {person.address.street}</p>
            <p>City: {person.address.city || "Unknown City"}</p>
        </>
    );
}       