import "./styles/App.css";

import { HashRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";

import TheOutlet from "./components/layout/TheOutlet";

import cars from "./data/Cars.json";
import { theCars } from "./context/CarsContext";
import Cars from "./components/cars/Cars";

function App() {
  return (
    <HashRouter>
      <theCars.Provider value={cars}>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/cars" element={<TheOutlet />}>
              <Route index={true} element={<Cars />} />
            </Route>
          </Routes>
        </div>
      </theCars.Provider>
    </HashRouter>
  );
}

export default App;
