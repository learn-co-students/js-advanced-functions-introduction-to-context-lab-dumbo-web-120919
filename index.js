// Your code here
function createEmployeeRecord(employeeInfo){
    return {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeRecs){
    return employeeRecs.map(employeeRec => createEmployeeRecord(employeeRec))
}

function createTimeInEvent(employeeRec, dateStamp){
    employeeRec.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.substr(11, 12)),
        date: dateStamp.substr(0, 10)
    })
    return employeeRec
}

function createTimeOutEvent(employeeRec, dateStamp){
    employeeRec.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.substr(11, 12)),
        date: dateStamp.substr(0, 10)
    })
    return employeeRec
}

function hoursWorkedOnDate(employeeRec, date){
    const startShift = employeeRec.timeInEvents.find(timeIn => timeIn.date === date).hour
    const endShift = employeeRec.timeOutEvents.find(timeIn => timeIn.date  === date).hour
    return endShift/100 - startShift/100
}

function wagesEarnedOnDate(employeeRec, date){
    const hours = hoursWorkedOnDate(employeeRec, date)
    return employeeRec.payPerHour * hours
}

function allWagesFor(employeeRec){
    const dailyWages = employeeRec.timeInEvents.map(timeInEvent => {
        return wagesEarnedOnDate(employeeRec, timeInEvent.date)
    })
    return dailyWages.reduce((wageTotal, wage) => wageTotal + wage)
}

function findEmployeeByFirstName(empList, firstName){
    return empList.find(emp => emp.firstName === firstName)
}

function calculatePayroll(empList){
    const allWages = empList.map(emp =>{
        return allWagesFor(emp)
    })
    return allWages.reduce((wageTotal, wage) => wageTotal + wage)
}