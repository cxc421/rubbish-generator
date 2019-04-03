import React, { useState } from 'react';

import 'style.scss';
import MainPage from './MainPage/MainPage';
import defaultBgDaySrc from 'assets/josh-hild-1423151-unsplash.jpg';
import defaultBgNightSrc from 'assets/sharon-christina-rorvik-250220-unsplash.jpg';

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
    isShowSideBar: false,
    bgDaySrc: defaultBgDaySrc,
    bgNightSrc: defaultBgNightSrc
  };

  componentDidMount() {
    this._isChrome = chrome && chrome.storage && chrome.storage.sync;
    if (!this._isChrome) {
      return this.setState({ ready: true });
    }
    let syncDataReady = false;
    let localDataReady = false;
    chrome.storage.sync.get(null, items => {
      syncDataReady = true;
      this.setState({
        ...items,
        ready: syncDataReady && localDataReady
      });
    });
    chrome.storage.local.get(null, items => {
      localDataReady = true;
      this.setState({
        ...items,
        ready: syncDataReady && localDataReady
      });
    });
    chrome.storage.onChanged.addListener((changes, type) => {
      // if (type !== 'sync') {
      //   return console.error('Not sync type');
      // }
      for (let key in changes) {
        const obj = changes[key];
        const val = obj.newValue;
        this.setState({ [key]: val });
      }
    });
  }

  setProxyState(obj, type = 'sync') {
    if (this._isChrome) {
      chrome.storage[type].set(obj);
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

  setBackground = ({ bgDaySrc, bgNightSrc }) => {
    // this.setState({ bgDaySrc, bgNightSrc });
    this.setProxyState({ bgDaySrc, bgNightSrc }, 'local');
  };

  resetBackground = () => {
    this.setProxyState(
      { bgDaySrc: defaultBgDaySrc, bgNightSrc: defaultBgNightSrc },
      'local'
    );
  };
  render() {
    const {
      ready,
      rubbishList,
      dayTheme,
      isShowSideBar,
      bgDaySrc,
      bgNightSrc
    } = this.state;

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
          bgDaySrc={bgDaySrc}
          bgNightSrc={bgNightSrc}
          setBackground={this.setBackground}
          resetBackground={this.resetBackground}
        />
      </React.Fragment>
    );
  }
}

export default App;
