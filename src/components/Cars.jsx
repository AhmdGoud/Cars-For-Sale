import { useContext, useMemo, useRef, useState } from "react";
import { theCars } from "../context/CarsContext";
import { styles } from "./carsStyles";
import "../styles/cars.css";

import SearchBar from "./SearchBar";
import PriceRangeFilter from "./PriceRangeFilter";
import CarCard from "./CarCard";
import CompareCard from "./CompareModal";
import LoanCard from "./LoanModal";

const Cars = () => {
  const priceRangeInput = useRef(null);
  const list = useContext(theCars);
  const [carsList, setCarsList] = useState(list);

  // search bar
  const [searchValue, setSearchValue] = useState("");
  const [rangeValue, setRangeValue] = useState(500000);
  const [searchBtnColor, setSearchBtnColor] = useState("gray");

  // compare card
  const [compareCardDisplay, setCompareCardDisplay] = useState(false);
  const [comparsionDisplay, setComparsionDisplay] = useState(false);
  const [numOfChoosedCars, setNumOfChoosedCars] = useState(0);
  const [choosedCars, setChoosedCars] = useState([]);

  // loan card
  const [loanCardDisplay, setLoanCardDisplay] = useState(false);
  const [carForLoan, setCarForLoan] = useState(null);
  const [loanTerms, setLoanTerms] = useState(5);

  // handle search bar
  function handleSearch() {
    const carsMatchSearch = list.filter((car) =>
      car.brand.toLowerCase().startsWith(searchValue),
    );
    carsMatchSearch.length
      ? setCarsList(carsMatchSearch)
      : alert("No Car Match Your Search");
  }

  function handleSearchChange(e) {
    setSearchValue(e.target.value);
    if (e.target.value === "") {
      setCarsList(list);
      setSearchBtnColor("gray");
    } else {
      setSearchBtnColor("#0048e0");
    }
  }

  // handle range input
  function handleRangeChange(e) {
    const value = Number(e.target.value);
    setRangeValue(value);

    const min = e.target.min;
    const max = e.target.max;
    const percent = ((value - min) / (max - min)) * 100;

    e.target.style.background = `
      linear-gradient(to right, #0048e0 0%, #0048e0 ${percent}%, #e5e7eb ${percent}%, #e5e7eb 100%)
    `;

    const carsInRange = list.filter((car) => car.price <= value);
    setCarsList(carsInRange);
  }

  function resetPriceFilter() {
    setRangeValue(500000);
    setCarsList(list);
    priceRangeInput.current.style.background = `
      linear-gradient(to right, #0048e0 0%, #0048e0 100%)
    `;
  }

  // choose cars for compare
  function chooseCarToCompare(ID) {
    let numCars = numOfChoosedCars;

    const newList = carsList.map((car) => {
      if (car.id === ID) {
        numCars = car.checked ? numCars - 1 : numCars + 1;

        const carChoosed = {
          id: car.id,
          brand: car.brand,
          model: car.model,
          year: car.year,
          price: car.price,
          color: car.color,
          fuel: car.fuel,
        };

        if (choosedCars.length > 0) {
          if (choosedCars[0].id === ID) {
            setChoosedCars([]);
          } else {
            setChoosedCars((prev) => [...prev, carChoosed]);
          }
        } else {
          setChoosedCars((prev) => [...prev, carChoosed]);
        }

        return { ...car, checked: !car.checked };
      }
      return car;
    });

    setCarsList(newList);
    setNumOfChoosedCars(numCars);
    setCompareCardDisplay(numCars >= 2);
  }

  // find car for loan calc
  function handleLoanCalc(ID) {
    const car = carsList.find((car) => car.id === ID);
    setCarForLoan(car);
    setLoanCardDisplay(true);
  }

  // back to choose other cars to compare
  function backToChoose() {
    setCarsList(list);
    setChoosedCars([]);
    setNumOfChoosedCars(0);
    setComparsionDisplay(false);
    setCompareCardDisplay(false);
  }

  const carCards = useMemo(() => {
    return carsList.map((carData) => (
      <CarCard
        key={carData.id}
        carData={carData}
        onCompare={chooseCarToCompare}
        onLoanCalc={handleLoanCalc}
      />
    ));
  }, [carsList]);

  return (
    <div style={{ padding: "50px 0" }}>
      <SearchBar
        searchValue={searchValue}
        searchBtnColor={searchBtnColor}
        onSearchChange={handleSearchChange}
        onSearch={handleSearch}
      />

      <PriceRangeFilter
        rangeValue={rangeValue}
        priceRangeRef={priceRangeInput}
        onRangeChange={handleRangeChange}
        onReset={resetPriceFilter}
      />

      <CompareCard
        isVisible={compareCardDisplay}
        comparsionDisplay={comparsionDisplay}
        choosedCars={choosedCars}
        onReselect={backToChoose}
        onCompare={() => setComparsionDisplay(true)}
        onClose={backToChoose}
      />

      <LoanCard
        isVisible={loanCardDisplay}
        car={carForLoan}
        loanTerms={loanTerms}
        onTermsChange={setLoanTerms}
        onClose={() => setLoanCardDisplay(false)}
      />

      <div style={styles.carsCard}>{carCards}</div>
    </div>
  );
};

export default Cars;
