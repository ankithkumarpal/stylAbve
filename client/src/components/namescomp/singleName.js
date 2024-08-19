import React, { useState } from 'react';

export const SingleName = () => {
  const [nameFields, setNameFields] = useState([{ id: 1 }]);

  const handleAddNameField = () => {
    setNameFields([...nameFields, { id: nameFields.length + 1 }]);
  };

  const handleRemoveNameField = (id) => {
    setNameFields(nameFields.filter((field) => field.id !== id));
  };

  return (
    <div>
      {nameFields.map((field) => (
        <div key={field.id} className="pair-quantity-input-group">
          <div className="single-quanityt-input-group">
            <div className="name-form-group">
              <input
                type="text"
                className="name-input-feild"
                placeholder={`Person ${field.id} name`}
              />
            </div>
            <div className="incre-decre-btn">
            <div onClick={handleAddNameField}> + </div>
            {nameFields.length > 1 && (
              <div onClick={() => handleRemoveNameField(field.id)}> - </div>
            )}
          </div>
          </div>
         
        </div>
      ))}
    </div>
  );
};
