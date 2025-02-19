import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PackageDetails from "./Pages/PackageDetails";
import PickupMethod from "./Pages/PickupMethod";
import DelivaryMethod from "./Pages/DelivaryMethod";
import ClearanceOptions from "./Pages/ClearanceOptions";
import Summary from "./Pages/Summary";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PackageDetails />} />
        <Route path="PickupMethod" element={<PickupMethod />} />
        <Route path="DelivaryMethod" element={<DelivaryMethod />} />
        <Route path="ClearanceOptions" element={<ClearanceOptions />} />
        <Route path="summary" element={<Summary />} />
      </Routes>
    </Router>
  );
}

export default App;
