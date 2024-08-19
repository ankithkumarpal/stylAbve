import React, { useState } from "react";
import "./name.css";

function QuantityInput() {
  const [inputPairs, setInputPairs] = useState([{ id: 1 }]);

  // Function to add a new pair
  const handleAddPair = () => {
    setInputPairs([...inputPairs, { id: inputPairs.length + 1 }]);
  };

  // Function to remove a pair
  const handleRemovePair = (id) => {
    if (inputPairs.length > 1) {
      setInputPairs(inputPairs.filter((pair) => pair.id !== id));
    }
  };

  return (
    <div className="pair-quantity-input-group">
      {inputPairs.map((pair) => (
        <div className="quanityt-input-group" key={pair.id}>
          <div className="name-form-group">
            <input
              type="email"
              className="name-input-feild"
              aria-describedby="emailHelp"
              placeholder="First person name"
            />
            <input
              type="email"
              className="name-input-feild mt-1"
              aria-describedby="emailHelp"
              placeholder="Second person name"
            />
          </div>
          <div className="incre-decre-btn">
            <div onClick={handleAddPair}> + </div>
            {inputPairs.length > 1 && (
              <div onClick={() => handleRemovePair(pair.id)}> - </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuantityInput;
