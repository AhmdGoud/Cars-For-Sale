import "./styles/App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";

import TheOutlet from "./components/TheOutlet";

import cars from "./data/Cars.json";
import { theCars } from "./context/CarsContext";
import Cars from "./components/Cars";

function App() {
  return (
    <BrowserRouter basename="/Cars-For-Sale">
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
