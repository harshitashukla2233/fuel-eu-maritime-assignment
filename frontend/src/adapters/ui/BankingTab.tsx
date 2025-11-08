import { useEffect, useState } from "react";
import { fetchCB, bankCB, applyCB } from "../infrastructure/api";

export default function BankingTab() {
  const [year, setYear] = useState(2025);
  const [cbData, setCbData] = useState<any[]>([]);

  const loadCB = () => {
    fetchCB(year).then(setCbData);
  };

  useEffect(() => { loadCB(); }, [year]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Banking</h2>
      <input type="number" value={year} onChange={e => setYear(Number(e.target.value))} className="border p-1 mb-2"/>
      <button onClick={loadCB} className="bg-blue-500 text-white p-2 ml-2 rounded">Refresh</button>
      <table className="min-w-full border mt-4">
        <thead>
          <tr>
            <th>Ship ID</th>
            <th>CB Before</th>
            <th>Bank</th>
            <th>Apply</th>
          </tr>
        </thead>
        <tbody>
          {cbData.map(ship => (
            <tr key={ship.shipId}>
              <td>{ship.shipId}</td>
              <td>{ship.cb}</td>
              <td>
                <button disabled={ship.cb <= 0} onClick={() => bankCB(ship.shipId, year).then(loadCB)} className="bg-green-500 text-white p-1 rounded">Bank</button>
              </td>
              <td>
                <button disabled={ship.cb <= 0} onClick={() => applyCB(ship.shipId, year, ship.cb).then(loadCB)} className="bg-yellow-500 text-white p-1 rounded">Apply</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
