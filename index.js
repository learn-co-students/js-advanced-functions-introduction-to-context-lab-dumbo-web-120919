// Your code here
function createEmployeeRecord(employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees) {
    return employees.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employeeObj, dateStamp) {
    let [date, hour] = dateStamp.split(" ")
    employeeObj.timeInEvents.push(
        {
            type: "TimeIn",
            hour: Number(hour),
            date: date
        }
    )

    return employeeObj
}

function createTimeOutEvent(employeeObj, dateStamp) {
    let [date, hour] = dateStamp.split(" ")
    employeeObj.timeOutEvents.push(
        {
            type: "TimeOut",
            hour: Number(hour),
            date: date
        }
    )

    return employeeObj
}

function hoursWorkedOnDate(employeeObj, date) {
    let hoursWorked = 0

    // find the matching date in timeIn && timeOut
    let timeOut = employeeObj.timeOutEvents.find(event => (event.date === date))
    let timeIn = employeeObj.timeInEvents.find(event => (event.date === date))
    // calculate hours worked 
    hoursWorked = (timeOut.hour - timeIn.hour) / 100

    return hoursWorked
}

function wagesEarnedOnDate(employeeObj, date) {
    let hoursWorked = hoursWorkedOnDate(employeeObj, date)
    let rate = employeeObj.payPerHour
    return rate * hoursWorked
}

function allWagesFor(employeeObj) {
    // from employee's timeIn events, get an array of working days 
    let workingDates = employeeObj.timeInEvents.map(event => event.date)
    // loop thru array of working days, calculate wages earned on each date, and ADD THEM ALL
    let wages = workingDates.reduce(function(accumulator, currDate) {
        return accumulator + wagesEarnedOnDate(employeeObj, currDate)
    }, 0)

    return wages
}

function findEmployeeByFirstName(employees, firstName) {
    return employees.find(employeeObj => employeeObj.firstName === firstName)
}


function calculatePayroll(employees) {
    // loop thru each employee object and add up all of their wages
    let payroll = employees.reduce(function(accumulator, currEmployee) {
        return accumulator + allWagesFor(currEmployee)
    }, 0)

    return payroll
}