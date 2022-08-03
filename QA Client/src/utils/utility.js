//* truncate string
export function truncate(str, n, boundary = '...'){
    return (str.length > n) ? str.substr(0, n-1) + boundary : str + '-';
};

export function randomColor() {
    let color = "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16);
    return color
}

export const randomValue = (val = 6) => {
    const rand = Math.round(Math.random() * val)
    if (rand === 0) {
        randomValue(val)
    } else {
        return rand
    }
}