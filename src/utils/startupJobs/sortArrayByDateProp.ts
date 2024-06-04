/**
 * Sort an array of elements by date
 * @param {Array<any>} array Array to sort
 * @param {string} dateProp Date property to sort by
 * @param { string} order Order of the sort (asc or desc)
 */

export function sortArrayByDateProp(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  array: Array<any>,
  dateProp: string,
  order: string | 'asc' | 'desc' = 'desc'
) {
  array.sort((a, b) => {
    const dateA = new Date(a[dateProp]);
    const dateB = new Date(b[dateProp]);

    if (order === 'asc') {
      return dateA.getTime() - dateB.getTime();
    }

    if (order === 'desc') {
      return dateB.getTime() - dateA.getTime();
    }

    throw new Error('Order must be asc or desc');
  });
}
