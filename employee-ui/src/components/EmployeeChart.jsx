


import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

function EmployeeChart({
  employees
}) {

  const departments =
    employees.reduce(
      (acc, emp) => {

        const dept =
          emp.department;

        acc[dept] =
          (acc[dept] || 0) + 1;

        return acc;

      },
      {}
    );

  const data =
    Object.keys(
      departments
    ).map((key) => ({
      name: key,
      value:
        departments[key]
    }));

  const COLORS = [
    "#00C49F",
    "#0088FE",
    "#FFBB28",
    "#FF8042"
  ];

  return (
    <PieChart
      width={400}
      height={300}
    >
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        outerRadius={100}
      >
        {data.map(
          (entry, index) => (
            <Cell
              key={index}
              fill={
                COLORS[
                  index %
                  COLORS.length
                ]
              }
            />
          )
        )}
      </Pie>

      <Tooltip />
      <Legend />
    </PieChart>
  );
}

export default EmployeeChart;