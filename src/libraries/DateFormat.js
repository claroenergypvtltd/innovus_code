import React from 'react';
import * as moment from 'moment';


export const DateFormat = {};
DateFormat.formatDate = formatDate;
DateFormat.todayDate = todayDate;
DateFormat.ListformatDate = ListformatDate;
DateFormat.expiryDate = expiryDate;

function formatDate(d) {
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

function todayDate() {
  var date = new Date()
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  if (dd < 10) { dd = '0' + dd }
  if (mm < 10) { mm = '0' + mm };
  return yyyy + '-' + mm + '-' + dd
}


function ListformatDate(d) {
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

//For License expiry Date calculation.
function expiryDate(insDate, duration, dayOrMonths) {
  if (dayOrMonths == 'd') {
    let date = moment(insDate).add(duration, 'd')
    let formattedDate = moment(date).format('L');
    return formattedDate;
  } else {
    let date = moment(insDate).add(duration, 'M')
    let formattedDate = moment(date).format('L');
    return formattedDate;
  }
}