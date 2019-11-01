
import * as moment from 'moment';

export function formatDate(d, data) {
  var date = new Date(d)
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  if (dd < 10) { dd = '0' + dd }
  if (mm < 10) { mm = '0' + mm };
  if (d == null) {
    console.log("Date null");
  } else {
    let MM = mm
    return !data ? d = dd + '-' + mm + '-' + yyyy : d = yyyy + '-' + MM + '-' + dd;
  }

}
export function timeformat(date) {
  let Setendtime;
  let timesplit = date.split(' ');
  Setendtime = timesplit[1] + timesplit[2];
  return Setendtime;
}
export function dateformat(date) {
  let Setendtime;
  let timesplit = date.split(' ');
  Setendtime = timesplit[1] + timesplit[2];
  // Setendtime = getStardate[2] + getStardate[1] + getStardate[0] + timesplit[1] + timesplit[2];
  return Setendtime;
}
