const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export function DDMMM_HHMM(inputDate) {
    if(inputDate === undefined) {
        return '-';
    }
    const utcDate = new Date(inputDate);
    const localDate = new Date(utcDate.toLocaleString('en-US', { timeZone: 'Asia/Karachi', hour12: false }));

    const day = localDate.getDate();
    const monthIndex = localDate.getMonth();
    const hours = localDate.getHours();
    const minutes = localDate.getMinutes();

    const formattedDate = `${day} ${months[monthIndex]} - ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

    return formattedDate;
}

export function ddmmyy(input) {
    const date = new Date(input);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);

    return `${day}/${month}/${year}`;
}

const transformedDate = new Intl.DateTimeFormat('en-GB', {
    hour12: false,
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
});

export const DDMMMMYYYY_HHMM = ({date}) => {
    const utcDate = new Date(date);
    const answer = transformedDate.format(utcDate);
    return answer;
};

export function calculateTimeDifference(startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
  
    const differenceMs = end - start;
  
    const hours = Math.floor(differenceMs / (1000 * 60 * 60)).toString().padStart(2, '0');
    const minutes = Math.floor((differenceMs / (1000 * 60)) % 60).toString().padStart(2, '0');
    const seconds = Math.floor((differenceMs / 1000) % 60).toString().padStart(2, '0');
  
    return `${hours}:${minutes}:${seconds}`;
  }

export function YYYYMMDD(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    const extractedDate = `${year}-${month}-${day}`;

    return extractedDate;
}

export function convertToLocalISOString(isoString) {
    const date = new Date(isoString);

    const pad = (num) => num.toString().padStart(2, '0');
    const padMilliseconds = (num) => num.toString().padStart(3, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    const milliseconds = padMilliseconds(date.getMilliseconds());

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
}
  