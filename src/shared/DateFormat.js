
import * as moment from 'moment';

export function formatDate(d) {
  var date = new Date(d)
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  if (dd < 10) { dd = '0' + dd }
  if (mm < 10) { mm = '0' + mm };
  if (d == null) {
    console.log("Date null");
  } else {
    return d = dd + '-' + mm + '-' + yyyy
  }

}
export function formatDateTime(date) {
  var d = new Date(date);
  var month;
  var day;
  var year;
  var kk = moment(date, 'DD.MM.YYYY')
  console.log("1111", d.toString()); // shows 'Invalid Date'
  console.log("11122221", typeof d); // shows 'object'
  console.log("1111344", d instanceof Date); // shows 'true'
  console.log(kk, '---------d-----');
  // month = '' + (d.getMonth() + 1),
  //   day = '' + d.getDate(),
  //   year = d.getFullYear();

  // if (month.length < 2)
  //   month = '0' + month;
  // if (day.length < 2)
  //   day = '0' + day;

  // return [year, month, day].join('-');
}
