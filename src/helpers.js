import moment from 'moment';

export function getCurrencyByCode(code) {
    const map = new Map([
        [980, "UAH"],
        [840, "USD"],
        [978, "EUR"]
    ]);

    return map.has(code) && map.get(code);
}

export function getDateFromTime(time) {
    const d = new Date(time * 1000);

    return moment(d).format('D MMMM YYYY'); // todo: use calendar
}
