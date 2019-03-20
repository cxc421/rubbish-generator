import React from 'react';
import classNames from 'classnames';
import bgDaySrc from 'assets/josh-hild-1423151-unsplash.jpg';
import bgNightSrc from 'assets/sharon-christina-rorvik-250220-unsplash.jpg';

const Background = ({ dayTheme, isShowSideBar }) => {
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
