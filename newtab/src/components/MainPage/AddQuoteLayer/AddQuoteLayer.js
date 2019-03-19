import React, { useState, useEffect } from 'react';
import produce from 'immer';
import classNames from 'classnames';
import { MdAdd } from 'react-icons/md';

const AddQuoteLayer = ({ hide = true, dayTheme = true, setRubbishList }) => {
  const [newRubbishText, setNewRubbishText] = useState('');

  function onInputSubmit(e) {
    e.preventDefault();
    const newText = newRubbishText.trim();
    if (newText.length > 0) {
      setRubbishList(
        produce(draftList => {
          draftList.splice(0, 0, {
            text: newText,
            id: new Date().getTime()
          });
        })
      );
      setNewRubbishText('');
    }
  }

  function onInputChange(e) {
    setNewRubbishText(e.target.value);
  }

  return (
    <div
      className={classNames(
        'add-quote-layer',
        { hide: hide },
        { night: !dayTheme }
      )}
    >
      <div className="add-quote">
        <h2 className="add-quote-title">“新增語錄”</h2>
        <form className="add-quote-input" onSubmit={onInputSubmit}>
          <input
            type="text"
            value={newRubbishText}
            placeholder="請輸入您充滿哲學的體悟。"
            onChange={onInputChange}
          />
          <MdAdd size={48} className="add-quote-icon" onClick={onInputSubmit} />
        </form>
      </div>
    </div>
  );
};

export default AddQuoteLayer;
