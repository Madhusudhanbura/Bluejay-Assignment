const ExcelJS = require("exceljs");
const excelInput = require("./excelInput");
require("core-js/actual/array/group-by");

// EntryPoint: Main Function
excelInput("Assignment_Timecard.xlsx")
  .then((result) => {
    const data = result.groupBy((obj) => obj["Employee Name"]);
    
    SolutionToA = sevenConsecutiveDays(data);
    console.log("Employees who worked consecutively for Seven Days::",SolutionToA);

    SolutionToB = workedBetweenGivenHours(data);
    console.log("Employees who worked between 1 and 10 Hours::",SolutionToB);

    SolutionToC = workedMoreThan14(data);
    console.log("Employees who worked for more than 14 Days::",SolutionToC);
  })
  .catch((err) => {
    console.log(err);
  });

// This function returns the solution/result to problem A
sevenConsecutiveDays = (data) => {
  employees = Object.keys(data);
  const result = [];

  employees.forEach((employee) => {
    let employeeData = data[employee];
    let employeeDataLength = employeeData.length;
    let employeeDataIndex = 0;
    let consecutiveDays = 0;

    while (
      employeeDataLength > 6 &&
      employeeDataIndex < employeeDataLength - 1
    ) {
      let isSameMonth =
        employeeData[employeeDataIndex]["Time"].date.split("-")[1] ===
        employeeData[employeeDataIndex + 1]["Time"].date.split("-")[1];
      let date = Number(
        employeeData[employeeDataIndex]["Time"].date.split("-")[2]
      );
      let nextDate = Number(
        employeeData[employeeDataIndex + 1]["Time"].date.split("-")[2]
      );
      let diffDays = Math.abs(nextDate - date);

      if (diffDays === 0) {
        employeeDataIndex++;
        continue;
      }

      if (isSameMonth && diffDays === 1) {
        consecutiveDays++;
        if (consecutiveDays >= 7) {
          result.push(employee);
          break;
        }
      } else {
        consecutiveDays = 0;
      }
      employeeDataIndex++;
    }
  });

  return result;
};

// This function returns the solution/result to problem B
workedBetweenGivenHours = (data) => {

    employees = Object.keys(data);
    const res = []
    
    employees.forEach((employee) => {
        let employeeData = data[employee];
        let employeeDataLength = employeeData.length;
        let employeeDataIndex = 0;

        while (employeeDataIndex < employeeDataLength - 1){
            let currDate = employeeData[employeeDataIndex]['Time'].date.split('-')[2];
            let nextDate = employeeData[employeeDataIndex + 1]['Time'].date.split('-')[2];

            if ((currDate != nextDate)) {
              employeeDataIndex++;
              continue;
            }

            // currShiftEndTime and nextShiftStartTime
            let currShiftEndTime = employeeData[employeeDataIndex]['Time Out'].time;
            let nextShiftStartTime = employeeData[employeeDataIndex + 1]['Time'].time;

            // calculate difference in time
            let currTime = new Date("01/01/2007 " + currShiftEndTime);
            let nextTime = new Date("01/01/2007 " + nextShiftStartTime);
            let diff = nextTime - currTime;
            let diffHours = Math.floor(diff / 1000 / 60 / 60);

            if (diffHours >= 1 && diffHours < 10){
                res.push(employee);
                break;
            }
            employeeDataIndex++;
        }
    })
    return res
}

// This function returns the solution/result to problem C
workedMoreThan14 = (data) => {
    employees = Object.keys(data);
    const res = []

    employees.forEach((employee) => {
        
        let entryLength = data[employee].length;

        let i = 0;
        while (i < entryLength){
            
            let workedForHours = data[employee][i]['Timecard Hours'].split(':')[0];
            
            if (Number(workedForHours) >= 14){
                res.push(employee);
                break;
            }
            i++;
        }
    })

    return res;
}