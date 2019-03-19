import React from 'react';
import classNames from 'classnames';
import { MdAdd } from 'react-icons/md';

const AddQuoteLayer = ({ hide = true, dayTheme = true }) => {
  function onInputSubmit(e) {
    e.preventDefault();
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
        <h2 className="add-quote-title">“ADD QUOTE”</h2>
        <form className="add-quote-input" onSubmit={onInputSubmit}>
          <input
            type="text"
            value="BLABLABLA"
            placeholder="Type new quote"
            onChange={() => {}}
          />
          <MdAdd size={48} className="add-quote-icon" onClick={onInputSubmit} />
        </form>
      </div>
    </div>
  );
};

export default AddQuoteLayer;
