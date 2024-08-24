import React, { useState, useEffect } from 'react';

export const SingleName = ({ onNameChange ,onInputRemove  }) => {
  const [nameFields, setNameFields] = useState([{ id: 1, value: '' }]);

  useEffect(() => {
    const totalLetters = nameFields.reduce((count, field) => count + field.value.length, 0);
    console.log(totalLetters)
  }, [nameFields]);

  const handleAddNameField = () => {
    setNameFields([...nameFields, { id: nameFields.length + 1, value: '' }]);
  };

  const handleRemoveNameField = (id) => {
    setNameFields(nameFields.filter((field) => field.id !== id));
    onInputRemove(id)
  };

  const handleNameChange = (id, value) => {
    setNameFields(nameFields.map((field) =>
      field.id === id ? { ...field, value } : field
    ));
    onNameChange(id, value);
  };

  return (
    <div>
      {nameFields.map((field) => (
        <div key={field.id} className="pair-quantity-input-group">
          <div className="single-quanityt-input-group">
            <div className="name-form-group">
              <input
                id={`name-input-${field.id}`}
                type="text"
                className="name-input-feild"
                placeholder={`Person ${field.id} name`}
                value={field.value}
                onChange={(e) => handleNameChange(field.id, e.target.value)}
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
