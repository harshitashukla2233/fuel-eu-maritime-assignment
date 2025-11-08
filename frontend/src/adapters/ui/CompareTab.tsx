import { useEffect, useState } from "react";
import { fetchRoutes } from "../infrastructure/api";

const TARGET = 89.3368;

export default function CompareTab() {
  const [routes, setRoutes] = useState<any[]>([]);

  useEffect(() => {
    fetchRoutes().then(setRoutes);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Compare</h2>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th>Route ID</th>
            <th>GHG Intensity</th>
            <th>% Diff vs Target</th>
            <th>Compliant</th>
          </tr>
        </thead>
        <tbody>
          {routes.map(r => {
            const percentDiff = ((r.ghgIntensity / TARGET) - 1) * 100;
            const compliant = r.ghgIntensity <= TARGET;
            return (
              <tr key={r.routeId}>
                <td>{r.routeId}</td>
                <td>{r.ghgIntensity.toFixed(2)}</td>
                <td>{percentDiff.toFixed(2)}%</td>
                <td>{compliant ? "✅" : "❌"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
