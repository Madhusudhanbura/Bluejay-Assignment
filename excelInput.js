const ExcelJS = require("exceljs");
const parseTime = require('./parseDate.js');

// This function processes the excel file and converts the data into list of employees grouped by their names
excelInput = async function(file) {
  try {

    const workbook = new ExcelJS.Workbook();

    await workbook.xlsx.readFile(file);
    const worksheet = workbook.getWorksheet(1);
    
    const data = [];

    worksheet.eachRow((row, rowNumber) => {

      // Skip those rows whose time is not given
      if (rowNumber > 1 && String(row.getCell(5).value).localeCompare('') && String(row.getCell(5).value).localeCompare('0:00')) {
        
        const rowData = {
          "Position ID": row.getCell(1).value,
          "Position Status": row.getCell(2).value,
          Time: parseTime(row.getCell(3).value),
          "Time Out": parseTime(row.getCell(4).value),
          "Timecard Hours": row.getCell(5).value,
          "Pay Cycle Start Date": parseTime(row.getCell(6).value),
          "Pay Cycle End Date": parseTime(row.getCell(7).value),
          "Employee Name": row.getCell(8).value,
          "File Number": row.getCell(9).value,
        };
        data.push(rowData);
        
      }
    });

    return data;
    
  } catch(e){
    console.error('Error readFile',e);
  }
};

module.exports = excelInput;