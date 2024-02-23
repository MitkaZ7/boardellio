export const formateDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
    return formattedDate

}
export const daysCount = (startDate) => {
    const currentDate = Date.now();
    const date = new Date(startDate);
    const dateDifference = Math.round((currentDate - date) / (1000 * 3600 * 24));
    console.log(dateDifference + ' дней')
  
}