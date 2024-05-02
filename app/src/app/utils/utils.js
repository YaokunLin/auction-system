export const formatCurrency = (value) => {
    if (value === null){
      return "-"
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  export function formatDate(dateString) {
    const date = new Date(dateString);

    // Get the parts of the date
    const month = date.getMonth() + 1; // getMonth() returns 0-11, adding 1 to make it 1-12
    const day = date.getDate();
    const year = date.getFullYear();
    let hour = date.getHours();
    const minute = date.getMinutes();

    // Determine AM or PM suffix
    const ampm = hour >= 12 ? 'PM' : 'AM';

    // Convert hour from 24-hour to 12-hour format
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'

    // Pad the minute with leading zero if needed
    const minutePadded = minute < 10 ? `0${minute}` : minute;

    // Format the date string
    return `${month}/${day}/${year} ${hour}:${minutePadded}${ampm}`;
}