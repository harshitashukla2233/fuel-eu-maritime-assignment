import { useEffect, useState } from "react";
import { fetchRoutes } from "../infrastructure/api";

export default function RoutesTab() {
  const [routes, setRoutes] = useState<any[]>([]);
  const [filterYear, setFilterYear] = useState<number | "">("");
  const [filterVessel, setFilterVessel] = useState<string>("");
  const [filterFuel, setFilterFuel] = useState<string>("");

  useEffect(() => {
    fetchRoutes().then(setRoutes);
  }, []);

  const filtered = routes.filter(r =>
    (filterYear === "" || r.year === filterYear) &&
    (filterVessel === "" || r.vesselType === filterVessel) &&
    (filterFuel === "" || r.fuelType === filterFuel)
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Routes</h2>
      <div className="flex gap-2 mb-4">
        <input type="number" placeholder="Year" value={filterYear} onChange={e => setFilterYear(Number(e.target.value))} className="border p-1"/>
        <input type="text" placeholder="Vessel Type" value={filterVessel} onChange={e => setFilterVessel(e.target.value)} className="border p-1"/>
        <input type="text" placeholder="Fuel Type" value={filterFuel} onChange={e => setFilterFuel(e.target.value)} className="border p-1"/>
      </div>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th>Route ID</th>
            <th>Vessel Type</th>
            <th>Fuel Type</th>
            <th>Year</th>
            <th>GHG Intensity</th>
            <th>Fuel Cons.</th>
            <th>Distance</th>
            <th>Total Emissions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(r => (
            <tr key={r.routeId}>
              <td>{r.routeId}</td>
              <td>{r.vesselType}</td>
              <td>{r.fuelType}</td>
              <td>{r.year}</td>
              <td>{r.ghgIntensity}</td>
              <td>{r.fuelConsumption}</td>
              <td>{r.distance}</td>
              <td>{r.totalEmissions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
