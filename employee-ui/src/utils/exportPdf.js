import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportEmployeesToPdf = (
  employees
) => {

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(
    "Employee Report",
    14,
    20
  );

  autoTable(doc, {
    startY: 30,

    head: [[
      "ID",
      "Name",
      "Email",
      "Department"
    ]],

    body: employees.map(
      (emp) => [
        emp.id,
        emp.name,
        emp.email,
        emp.department
      ]
    )
  });

  doc.save(
    "employees.pdf"
  );
};