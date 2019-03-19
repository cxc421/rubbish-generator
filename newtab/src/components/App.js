import React, { useState } from 'react';

import 'style.scss';
import MainPage from './MainPage/MainPage';

const defaultRubbishList = [
  { id: 1, text: '雨後的高雄，有下過雨的味道。' },
  { id: 2, text: '與你在一起的夏天比冬天更溫暖。' },
  { id: 3, text: '跟你講電話的那個晚上，我聽見了你的聲音。' }
];

const App = () => {
  const [rubbishList, setRubbishList] = useState(defaultRubbishList);
  const [dayTheme, setDayTheme] = useState(true);
  const [isShowSideBar, setIsShowSideBar] = useState(true);

  return (
    <React.Fragment>
      <MainPage
        dayTheme={dayTheme}
        setDayTheme={setDayTheme}
        isShowSideBar={isShowSideBar}
        setIsShowSideBar={setIsShowSideBar}
        rubbishList={rubbishList}
        setRubbishList={setRubbishList}
      />
    </React.Fragment>
  );
};

export default App;
