import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function DashboardChart({ employees }) {

  const departmentData =
    Object.values(
      employees.reduce(
        (acc, emp) => {

          if (!acc[emp.department]) {
            acc[emp.department] = {
              department:
                emp.department,
              count: 0
            };
          }

          acc[emp.department].count++;

          return acc;

        },
        {}
      )
    );

  return (
    <div className="card p-3 mb-4">
      <h4>
        Employees by Department
      </h4>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={departmentData}>
          <XAxis dataKey="department" />
          <YAxis />
          <Tooltip />

          <Bar
            dataKey="count"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DashboardChart;