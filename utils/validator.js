export function validateTitle(title) {
    return typeof title === 'string' && title.trim().length > 0;
}

export function validateYear(year) {
    const currentYear = new Date().getFullYear();
    return Number.isInteger(year) && year > 1900 && year <= currentYear;
}

export function validateRating(rating) {
    return typeof rating === 'number' && !isNaN(rating) && rating >= 0 && rating <= 10;
}