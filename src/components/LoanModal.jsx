const LoanCard = ({ isVisible, car, loanTerms, onTermsChange, onClose }) => {
  if (!car) return null;

  const downPayment = car.price * (5 / 100);
  const interestRate = loanTerms * 2;
  const loanAmount = car.price - downPayment + (interestRate / 100) * car.price;
  const monthlyPayment = Math.ceil(loanAmount / (loanTerms * 12));
  const totalPayment = monthlyPayment * (loanTerms * 12) + downPayment;

  return (
    <div className="loanCard" style={{ top: isVisible ? "0px" : "-100vh" }}>
      <div className="loanInfo">
        <p>
          <span>Car Price:</span> {car.price}$
        </p>
        <p>
          <span>Interest Rate:</span> {interestRate}%
        </p>
        <p>
          <span>Down Payment:</span> {downPayment}$
        </p>

        <div style={{ width: "100%", textAlign: "start" }}>
          <span>Loan Terms (years):</span>{" "}
          <button onClick={() => loanTerms > 1 && onTermsChange(loanTerms - 1)}>
            -
          </button>
          <span id="loan-terms">{loanTerms}</span>
          <button onClick={() => loanTerms < 5 && onTermsChange(loanTerms + 1)}>
            +
          </button>
        </div>

        <div className="monthlyPayment">
          <span>Monthly Payment: </span>
          {monthlyPayment}$
        </div>

        <p>
          <span>Total Payments: </span>
          {totalPayment}$
        </p>
      </div>

      <button className="backBtn" onClick={onClose}>
        X
      </button>
    </div>
  );
};

export default LoanCard;
