import { useEffect, useState } from "react";
import { fetchCB, createPool } from "../infrastructure/api";

export default function PoolingTab() {
  const [year, setYear] = useState(2025);
  const [cbData, setCbData] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    fetchCB(year).then(setCbData);
  }, [year]);

  const toggleSelect = (shipId: string) => {
    setSelected(prev => prev.includes(shipId) ? prev.filter(s => s !== shipId) : [...prev, shipId]);
  };

  const handleCreatePool = () => {
    createPool(year, selected.map(shipId => ({ shipId }))).then(res => {
      alert("Pool created! Check console.");
      console.log(res);
      fetchCB(year).then(setCbData);
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Pooling</h2>
      <input type="number" value={year} onChange={e => setYear(Number(e.target.value))} className="border p-1 mb-2"/>
      <button onClick={handleCreatePool} disabled={selected.length === 0} className="bg-blue-500 text-white p-2 ml-2 rounded">Create Pool</button>
      <table className="min-w-full border mt-4">
        <thead>
          <tr>
            <th>Select</th>
            <th>Ship ID</th>
            <th>CB</th>
          </tr>
        </thead>
        <tbody>
          {cbData.map(ship => (
            <tr key={ship.shipId}>
              <td>
                <input type="checkbox" checked={selected.includes(ship.shipId)} onChange={() => toggleSelect(ship.shipId)} />
              </td>
              <td>{ship.shipId}</td>
              <td>{ship.cb}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
