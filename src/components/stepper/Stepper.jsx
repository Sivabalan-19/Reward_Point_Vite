import React from 'react';

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="stepper-container">
      {steps.map((step, index) => (
        <div className="stepper-item" key={index}>
          <div className={`stepper-circle ${currentStep >= step ? 'active' : ''}`}>
            {step}
          </div>
          {index < steps.length - 1 && <div className={`stepper-line ${currentStep >= step ? 'active' : ''}`}></div>}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
