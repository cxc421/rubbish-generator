import React from 'react';
import classNames from 'classnames';

const Background = ({ dayTheme, isShowSideBar, bgDaySrc, bgNightSrc }) => {
  return (
    <div
      className={classNames('background-wrapper', {
        'wtih-sidebar': isShowSideBar
      })}
    >
      <div
        style={{
          backgroundColor: '#D28A04',
          backgroundImage: `url(${bgDaySrc})`,
          opacity: dayTheme ? 1 : 0
        }}
      />
      <div
        style={{
          backgroundColor: '#C4C4C4',
          backgroundImage: `url(${bgNightSrc})`,
          opacity: dayTheme ? 0 : 1
        }}
      />
    </div>
  );
};

export default Background;
