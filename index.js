function createEmployeeRecord(array) {
  let employeeRecordObject = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  };
  return employeeRecordObject;
};

function createEmployeeRecords(arrayOfArrays) {
  let employeeRecordsArray = [];
  arrayOfArrays.forEach( array => employeeRecordsArray.push(createEmployeeRecord(array)) )
  return employeeRecordsArray;
};

function createTimeInEvent(emplRecordObj, dateStamp) {
  // dateStamp in "YYYY-MM-DD HHMM" format
  let timeInObject = {
    type: "TimeIn",
    hour: parseInt(dateStamp.slice(-4)),
    date: dateStamp.slice(0, 10)
  }
  emplRecordObj.timeInEvents.push(timeInObject);
  return emplRecordObj;
};

function createTimeOutEvent(emplRecordObj, dateStamp) {
  let timeOutObj = {
    type: "TimeOut",
    hour: parseInt(dateStamp.slice(-4)),
    date: dateStamp.slice(0, 10)
  };
  emplRecordObj.timeOutEvents.push(timeOutObj);
  return emplRecordObj;
};

function hoursWorkedOnDate (emplRecordObj, inputDate) {
  // date is in form "YYYY-MM-DD"
  let timeInObj = emplRecordObj.timeInEvents.find( timeInEvent => timeInEvent.date === inputDate);
  let timeOutObj = emplRecordObj.timeOutEvents.find( timeOutEvent => timeOutEvent.date === inputDate);
  let hoursWorked = Math.abs((timeOutObj.hour - timeInObj.hour) / 100);
  return hoursWorked;
};

function wagesEarnedOnDate(emplRecordObj, inputDate) {
  let wagesEarned = (hoursWorkedOnDate(emplRecordObj, inputDate) * emplRecordObj.payPerHour);
  return wagesEarned;
};

function allWagesFor(emplRecordObject) {
  let datesWorked = [];
  emplRecordObject.timeInEvents.map( timeInEvent => datesWorked.push(timeInEvent.date) );

  let totalWages = 0;
  datesWorked.forEach( date => totalWages = (totalWages + wagesEarnedOnDate(emplRecordObject, date)) );
  
  return totalWages;
};

function findEmployeeByFirstName(arrayOfEmplRecords, soughtFirstName) {
  return arrayOfEmplRecords.find( emplRecord => emplRecord.firstName === soughtFirstName );
};

function calculatePayroll(arrayOfEmplRecords) {
  let grandTotal = 0;
  arrayOfEmplRecords.forEach( emplRecord => grandTotal = (grandTotal + allWagesFor(emplRecord)) );
  return grandTotal;
};