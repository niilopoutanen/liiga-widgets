export function formatDate(value, { padDay = false } = {}) {
    const date = new Date(value);
    const day = String(date.getDate());

    return `${padDay ? day.padStart(2, "0") : day}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

export function formatTime(value) {
    const date = new Date(value);

    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

export function parseId(value) {
    if (value == null) return null;

    return String(value).split(":").at(-1);
}
