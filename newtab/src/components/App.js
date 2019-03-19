import React, { useState } from 'react';

import 'style.scss';
import MainPage from './MainPage/MainPage';

const defaultRubbishList = [
  { id: 1, text: '雨後的高雄，有下過雨的味道。' },
  { id: 2, text: '與你在一起的夏天比冬天更溫暖。' },
  { id: 3, text: '跟你講電話的那個晚上，我聽見了你的聲音。' }
];

class App extends React.Component {
  state = {
    ready: false,
    rubbishList: defaultRubbishList,
    dayTheme: true,
    isShowSideBar: false
  };

  componentDidMount() {
    this._isChrome = chrome && chrome.storage && chrome.storage.sync;
    if (!this._isChrome) {
      return this.setState({ ready: true });
    }
    chrome.storage.sync.get(null, items => {
      this.setState({
        ...items,
        ready: true
      });
    });
    chrome.storage.onChanged.addListener((changes, type) => {
      if (type !== 'sync') {
        return console.error('Not sync type');
      }
      for (let key in changes) {
        const obj = changes[key];
        const val = obj.newValue;
        // console.log({ key, val });
        this.setState({ [key]: val });
      }
    });
  }

  setProxyState(obj) {
    if (this._isChrome) {
      chrome.storage.sync.set(obj);
    } else {
      this.setState(obj);
    }
  }

  setDayTheme = dayTheme => {
    this.setProxyState({ dayTheme });
  };

  setIsShowSideBar = isShowSideBar => {
    this.setState({ isShowSideBar });
  };

  setRubbishList = rubbishList => {
    this.setProxyState({ rubbishList });
  };

  render() {
    const { ready, rubbishList, dayTheme, isShowSideBar } = this.state;

    if (!ready) {
      return null;
    }

    return (
      <React.Fragment>
        <MainPage
          dayTheme={dayTheme}
          setDayTheme={this.setDayTheme}
          isShowSideBar={isShowSideBar}
          setIsShowSideBar={this.setIsShowSideBar}
          rubbishList={rubbishList}
          setRubbishList={this.setRubbishList}
        />
      </React.Fragment>
    );
  }
}

export default App;
