/**
 * Utility for getting the current month, week, day, and hour
 */
const getTimeComponents = () => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)) + 1;
    return {
        month: now.getMonth() + 1,
        week: Math.ceil(dayOfYear / 7),
        day: now.getDate(),
        hour: now.getHours(),
    };
}
export default getTimeComponents;