import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportEmployeesToExcel = (employees) => {
  const worksheet =
    XLSX.utils.json_to_sheet(employees);

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Employees"
  );

  const excelBuffer =
    XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });

  const file = new Blob(
    [excelBuffer],
    {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    }
  );

  saveAs(file, "employees.xlsx");
};