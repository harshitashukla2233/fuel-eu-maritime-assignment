import RoutesTab from "./adapters/ui/RoutesTab";
import CompareTab from "./adapters/ui/CompareTab";
import BankingTab from "./adapters/ui/BankingTab";
import PoolingTab from "./adapters/ui/PoolingTab";

function App() {
  return (
    <div className="space-y-4">
      <RoutesTab />
      <CompareTab />
      <BankingTab />
      <PoolingTab />
    </div>
  );
}

export default App;
