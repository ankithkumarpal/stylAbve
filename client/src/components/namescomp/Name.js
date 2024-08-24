import React, { useState, useEffect } from "react";
import "./name.css";

function QuantityInput({ onPairChange , onInputPairRemove}) {
  const [inputPairs, setInputPairs] = useState([{ id: 1, value1: '', value2: '' }]);

  useEffect(() => {
    const totalLetters = inputPairs.reduce(
      (count, pair) => count + pair.value1.length + pair.value2.length,
      0
    );
  }, [inputPairs]);

  const handleAddPair = () => {
    setInputPairs([...inputPairs, { id: inputPairs.length + 1, value1: '', value2: '' }]);
  };

  const handleRemovePair = (id) => {
    if (inputPairs.length > 1) {
      setInputPairs(inputPairs.filter((pair) => pair.id !== id));
    }
    onInputPairRemove(id);
  };

  const handleInputChange = (id, index, value) => {
    setInputPairs(inputPairs.map((pair) =>
      pair.id === id
        ? { ...pair, [`value${index}`]: value }
        : pair
    ));
    onPairChange(id, index, value);
  };

  return (
    <div className="pair-quantity-input-group">
      {inputPairs.map((pair) => (
        <div className="quanityt-input-group" key={pair.id}>
          <div className="name-form-group"> 
            <input
              id={`pair-input-${pair.id}-1`}
              type="text"
              className="name-input-feild"
              placeholder="First person name"
              value={pair.value1}
              onChange={(e) => handleInputChange(pair.id, 1, e.target.value)}
            />
            <input
              id={`pair-input-${pair.id}-2`}
              type="text"
              className="name-input-feild mt-1"
              placeholder="Second person name"
              value={pair.value2}
              onChange={(e) => handleInputChange(pair.id, 2, e.target.value)}
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
