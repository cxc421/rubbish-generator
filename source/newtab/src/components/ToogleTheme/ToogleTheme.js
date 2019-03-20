import React, { useState } from 'react';
import classNames from 'classnames';

const ToogleTheme = ({ className = '', dayTheme, setDayTheme }) => {
  function toggle() {
    setDayTheme(!dayTheme);
  }

  return (
    <div
      className={classNames(
        'toggle-theme',
        { [className]: className },
        { left: dayTheme },
        { right: !dayTheme }
      )}
      onClick={toggle}
    >
      <div className="toggle-theme-circle" />
    </div>
  );
};

export default ToogleTheme;
