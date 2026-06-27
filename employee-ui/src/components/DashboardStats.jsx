import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function DashboardStats({ employees }) {
  const departmentData = Object.entries(
    employees.reduce((acc, emp) => {
      acc[emp.department] =
        (acc[emp.department] || 0) + 1;

      return acc;
    }, {})
  ).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = [
    "#00C49F",
    "#0088FE",
    "#FFBB28",
    "#FF8042",
    "#A855F7"
  ];

  return (
    <div className="card bg-dark text-light p-3 mb-4">
      <h4>Department Distribution</h4>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>
          <Pie
            data={departmentData}
            dataKey="value"
            outerRadius={100}
            label
          >
            {departmentData.map(
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
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DashboardStats;