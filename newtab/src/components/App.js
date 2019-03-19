import React, { useState } from 'react';

import 'style.scss';
import MainPage from './MainPage/MainPage';

const App = () => {
  const [dayTheme, setDayTheme] = useState(true);
  const [isShowSideBar, setIsShowSideBar] = useState(true);

  return (
    <React.Fragment>
      <MainPage
        dayTheme={dayTheme}
        setDayTheme={setDayTheme}
        isShowSideBar={isShowSideBar}
        setIsShowSideBar={setIsShowSideBar}
      />
    </React.Fragment>
  );
};

export default App;
