import React from 'react';
import classNames from 'classnames';
import { FaBars } from 'react-icons/fa';
import ToggleTheme from '../../ToogleTheme/ToogleTheme';

function findSplitChar(string) {
  if (string.indexOf(',' >= 0) && string.split(',').length > 1) return ',';
  if (string.search(/[\uff0c]/g) !== null) return '\uff0c';
  return null;
}

function splitText(string) {
  const splitChar = findSplitChar(string);

  if (splitChar === null) {
    return <div>{string}</div>;
  }

  let key = 0;
  let result = [];
  let arr = string.split(splitChar);
  for (let i = 0; i < arr.length; i++) {
    let s = arr[i];
    if (i < arr.length - 1) {
      result.push(<div key={key++}>{s + splitChar}</div>);
      result.push(<br key={key++} />);
    } else {
      result.push(<div key={key++}>{s}</div>);
    }
  }
  return result;
}

const appendNightClassName = (className, dayTheme) => {
  if (dayTheme) {
    return className;
  }
  return `${className} night`;
};

const TopLayer = ({ dayTheme, setDayTheme, hide, setIsShowSideBar }) => {
  return (
    <div className={classNames('top-layer', { hide: hide })}>
      <span className={appendNightClassName('quote', dayTheme)}>“</span>
      <div className={appendNightClassName('rubbish', dayTheme)}>
        {/* {splitText('If you change nothing, nothing will change.')} */}
        {splitText('雨後的高雄，有下過雨的味道。')}
      </div>
      <FaBars
        className={appendNightClassName('toggle-icon', dayTheme)}
        size={41}
        onClick={() => setIsShowSideBar(true)}
      />
      <ToggleTheme
        className="top-layer-toggle-theme"
        dayTheme={dayTheme}
        setDayTheme={setDayTheme}
      />
    </div>
  );
};

export default TopLayer;
