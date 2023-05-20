export function generateYearsArray(startYear, endYear) {
    const years = [];
    for (let i = endYear; i >= startYear; i--) {
        years.push(i);
    }
    return years;
}
const now = new Date();
export const currentYear = now.getFullYear();
