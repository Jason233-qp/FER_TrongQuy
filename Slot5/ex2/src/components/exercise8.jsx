export function Exercise8() {
    /*Mục tiêu: Tính tổng, min, max, và đếm theo nhóm bằng reduce.
    Yêu cầu:
    -	Với ages (mảng số), tính:
    -	total, min, max
    -	buckets: { teen: count(13–19), adult: count(>=20) }
    -	In dạng:
    -	Total: X, Min: Y, Max: Z
    -   Buckets: { teen: a, adult: b }
    */
    const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];
    const result = ages.reduce((acc, age) => {
        acc.total += age;
        acc.min = Math.min(acc.min, age);
        acc.max = Math.max(acc.max, age);
        if (age >= 13 && age <= 19) {
            acc.buckets.teen++;
        } else if (age >= 20) {
            acc.buckets.adult++;
        }
        return acc;
    }, { total: 0, min: Infinity, max: -Infinity, buckets: { teen: 0, adult: 0 } });

    return (
        <>
            <h2>Exercise 8</h2>
            <p>Total: {result.total}</p>
            <p>Min: {result.min}</p>
            <p>Max: {result.max}</p>
            <p>Buckets: {JSON.stringify(result.buckets)}</p>
        </>
    );
}