import i18n from './i18n'
const t = i18n.t.bind(i18n);
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
    const daysDifference = Math.round((currentDate - date) / (1000 * 3600 * 24));
    let countingResult = '';
    if (daysDifference < 1) {
        const hoursDifference = Math.round((currentDate - date) / (1000 * 3600));
        if (hoursDifference === 1) {
            countingResult = `${hoursDifference} ${t('hour')}`;
        } else if (hoursDifference > 1 && hoursDifference < 4) {
            countingResult = `${hoursDifference} ${t('hour-s')}`
        } else {
            countingResult = `${hoursDifference} ${t('hours')}`
        }
    } else {
        if (daysDifference === 1 || (daysDifference % 10 === 1 && daysDifference !== 11)) {
            countingResult = `${daysDifference} ${t('day')}`
        } else if (daysDifference > 1 && daysDifference < 5 || (daysDifference % 10 > 1 && daysDifference % 10 < 5 && daysDifference !== 12 && daysDifference !== 13 && daysDifference !== 14)) {
            countingResult = `${daysDifference} ${t('day-s')}`
        } else {
            countingResult = `${daysDifference} ${t('days')}`
        }
    }
    return countingResult;
}