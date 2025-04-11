export const truncateString = (title, maxLength=15) => {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
};