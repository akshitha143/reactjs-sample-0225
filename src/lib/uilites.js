export function formatDateWithSuffix(dateString) {
  const date = new Date(dateString);

  const day = date.getUTCDate();
  const month = date.toLocaleString('default', { month: 'long' }); // "June"
  const year = date.getUTCFullYear();

  const getDaySuffix = (d) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  return `${day}${getDaySuffix(day)} ${month}, ${year}`;
}
