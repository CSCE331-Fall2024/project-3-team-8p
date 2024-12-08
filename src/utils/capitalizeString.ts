/**
 * Utility for capitalizing a given string
 * @param str - The string to capitalize
 */
const capitalizeString = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export default capitalizeString;