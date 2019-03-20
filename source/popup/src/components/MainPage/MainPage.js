import React from 'react';
import classNames from 'classnames';
import SideBar from '../SideBar/SideBar';

const MainPage = ({
  dayTheme,
  setDayTheme,
  isShowSideBar,
  setIsShowSideBar,
  rubbishList,
  setRubbishList
}) => {
  return (
    <div
      className={classNames(
        'main-page',
        { day: dayTheme },
        { night: !dayTheme }
      )}
    >
      <SideBar
        show={isShowSideBar}
        dayTheme={dayTheme}
        setDayTheme={setDayTheme}
        setIsShowSideBar={setIsShowSideBar}
        rubbishList={rubbishList}
        setRubbishList={setRubbishList}
      />
    </div>
  );
};

export default MainPage;
