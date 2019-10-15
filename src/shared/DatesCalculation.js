import React from 'react'
import * as moment from 'moment';
import { extendMoment } from 'moment-range';
const rangemoment = extendMoment(moment);
let DatesCalculation = {
    // year and month are variables

    dateType: (value, form, component) => {
        if (value === "month") {
            var startDate = moment().startOf('month').format('YYYY-MM-DD');
            console.log('date', startDate);
            let firstDay = moment(startDate).startOf('month')
            let endDay = moment(startDate).endOf('month')
            let monthRange = rangemoment.range(firstDay, endDay);
            let weeks = [];
            for (let mday of monthRange.by('days')) {
                if (weeks.indexOf(mday.week()) === -1) {
                    weeks.push(mday.week());
                }
            }
            // This will prepare array with number of weeks.
            // Now we just need to loop through it as below:

            let calendar = []
            for (let index = 0; index < weeks.length; index++) {
                var weeknumber = weeks[index];
                let firstWeekDay = moment(firstDay).week(weeknumber).day(0);
                if (firstWeekDay.isBefore(firstDay)) {
                    firstWeekDay = firstDay;
                }
                let lastWeekDay = moment(endDay).week(weeknumber).day(6);
                if (lastWeekDay.isAfter(endDay)) {
                    lastWeekDay = endDay;
                }
                let weekRange = rangemoment.range(firstWeekDay, lastWeekDay)
                calendar.push(weekRange)
            }
            return calendar;
        }
    }
}
export default DatesCalculation;