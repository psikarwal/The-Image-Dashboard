import { json2excel } from 'js2excel';

export function toXls(data) {
  try {
    json2excel({
      data,
      name: 'user-info-data',
      formateDate: 'yyyy/mm/dd'
    });
  } catch (e) {
    console.error('export error');
  }
}
