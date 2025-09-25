export function Exercise4() {
    //Mục tiêu: Bỏ qua phần tử, đặt mặc định.
    //Yêu cầu:
    //•	Với const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];
    //•	Dùng destructuring để lấy first, bỏ qua phần tử thứ 2, lấy third (mặc định 0 nếu không tồn tại), và restAges cho phần còn lại.
    //•	In ra: first, third, restAges.

    const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];
    const [first, , third = 0, ...restAges] = ages;
    return (
        <div>
            <h2>Exercise 4</h2>
            <p>First: {first}, Third: {third}, RestAges: [{restAges.join(", ")}]</p>
        </div>
    );
}