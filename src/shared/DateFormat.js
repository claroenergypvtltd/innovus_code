// import React from 'react';
// import * as moment from 'moment';


// export const DateFormat = {};
// DateFormat.formatDate = formatDate;

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
    return d = yyyy + '-' + mm + '-' + dd
  }

}
