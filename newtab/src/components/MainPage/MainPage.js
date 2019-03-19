import React from 'react';
import classNames from 'classnames';
import Background from './Background/Background';
import TopLayer from './TopLayer/TopLayer';
import SideBar from './SideBar/SideBar';
import AddQuoteLayer from './AddQuoteLayer/AddQuoteLayer';

const MainPage = ({
  dayTheme,
  setDayTheme,
  isShowSideBar,
  setIsShowSideBar
}) => {
  return (
    <div
      className={classNames(
        'main-page',
        { day: dayTheme },
        { night: !dayTheme }
      )}
    >
      <Background dayTheme={dayTheme} isShowSideBar={isShowSideBar} />
      <TopLayer
        dayTheme={dayTheme}
        setDayTheme={setDayTheme}
        setIsShowSideBar={setIsShowSideBar}
        hide={isShowSideBar}
      />
      <AddQuoteLayer dayTheme={dayTheme} hide={!isShowSideBar} />
      <SideBar
        show={isShowSideBar}
        dayTheme={dayTheme}
        setDayTheme={setDayTheme}
        setIsShowSideBar={setIsShowSideBar}
      />
    </div>
  );
};

export default MainPage;
