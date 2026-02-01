import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";

import TheOutlet from "./AllCars/TheOutlet";

import cars from "./Cars.json";
import { theCars } from "./AllCars/CarsContext";
import Cars from "./AllCars/TheCars";

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
