
export function validDate(date) {

    if (!date) return false;
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    return dateRegex.test(date);
};

export function formatDate(date) {
    
    const dates = date.split("-");
    return new Date(dates[2], dates[1] - 1, dates[0]);
};


export function dateBigger(smallDate, bigDate) {

    if (!smallDate || !bigDate) return false;
    return formatDate(smallDate) > bigDate;
};


export function biggerFormat(smallDate, bigDate) {

    if (!smallDate || !bigDate) return false;
    return formatDate(smallDate) > formatDate(bigDate);
};


export function formatBR(date) { 
    
    let newDate = new Date(date);
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1; 
    let year = newDate.getFullYear();

    var result = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
    return result;
};