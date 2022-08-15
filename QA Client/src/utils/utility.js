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

export const formatDate = (dueDateTime) => {
    const date = new Date(dueDateTime);
    const day = date.getDate();
    const monthList = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const textMonth = monthList[date.getMonth()];
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12;
    const sHours = hour12 < 10 ? `0${hour12}` : hour12;
    const sMinutes = minute < 10 ? `0${minute}` : minute;
    const formattedTime = `${sHours}:${sMinutes} ${ampm}`;
    return `${textMonth} ${day}, ${year}`;
};
export const formatDateTime = (dueDateTime) => {
    const date = new Date(dueDateTime);
    const day = date.getDate();
    const monthList = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const textMonth = monthList[date.getMonth()];
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12;
    const sHours = hour12 < 10 ? `0${hour12}` : hour12;
    const sMinutes = minute < 10 ? `0${minute}` : minute;
    const formattedTime = `${sHours}:${sMinutes} ${ampm}`;
    return `${textMonth} ${day}, ${year} ${formattedTime}`;
};