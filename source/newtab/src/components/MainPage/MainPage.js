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
  setIsShowSideBar,
  rubbishList,
  setRubbishList,
  bgDaySrc,
  bgNightSrc,
  setBackground
}) => {
  return (
    <div
      className={classNames(
        'main-page',
        { day: dayTheme },
        { night: !dayTheme }
      )}
    >
      <Background
        dayTheme={dayTheme}
        isShowSideBar={isShowSideBar}
        bgDaySrc={bgDaySrc}
        bgNightSrc={bgNightSrc}
      />
      <TopLayer
        dayTheme={dayTheme}
        setDayTheme={setDayTheme}
        setIsShowSideBar={setIsShowSideBar}
        hide={isShowSideBar}
        rubbishList={rubbishList}
        setRubbishList={setRubbishList}
      />
      <AddQuoteLayer
        dayTheme={dayTheme}
        hide={!isShowSideBar}
        rubbishList={rubbishList}
        setRubbishList={setRubbishList}
      />
      <SideBar
        show={isShowSideBar}
        dayTheme={dayTheme}
        setDayTheme={setDayTheme}
        setIsShowSideBar={setIsShowSideBar}
        rubbishList={rubbishList}
        setRubbishList={setRubbishList}
        bgDaySrc={bgDaySrc}
        bgNightSrc={bgNightSrc}
        setBackground={setBackground}
      />
    </div>
  );
};

export default MainPage;
