const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export function DDMMM_HHMM(inputDate) {
    if(inputDate == undefined) {
        return '-'
    }
    const date = new Date(inputDate);

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDate = `${day} ${months[monthIndex]} - ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

    return formattedDate;
}

const transformedDate = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'UTC',
    hour12: false,
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
});

export const DDMMMMYYYY_HHMM = ({date}) => {
    const answer = transformedDate.format(date)
    return answer
}

export function YYYYMMDD(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
  
    const extractedDate = `${year}-${month}-${day}`;
  
    return extractedDate;
  }