import React, { useState, useEffect } from 'react';
import produce from 'immer';
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

const makeRandomRubbishId = rubbishList => {
  const index = Math.floor(Math.random() * rubbishList.length);
  return rubbishList[index] ? rubbishList[index].id : 0;
};

const findRubbishById = (rubbishList, id) => {
  const rubbish = rubbishList.find(r => r.id === id);
  return rubbish || null;
};

const TopLayer = ({
  dayTheme,
  setDayTheme,
  hide,
  setIsShowSideBar,
  rubbishList,
  setRubbishList
}) => {
  const [rubbishId, setRubbishId] = useState(makeRandomRubbishId(rubbishList));
  const [isEditMode, setEditMode] = useState(false);
  const [tmpRubbish, setTmpRubbish] = useState({ id: '', text: '' });
  const selectRubbish = findRubbishById(rubbishList, rubbishId);
  const rubbish = selectRubbish ? selectRubbish.text : '';
  const rubbishElments = isEditMode ? (
    <React.Fragment>
      <input
        type="text"
        value={tmpRubbish.text}
        onChange={onChangeTmpRubbish}
        autoFocus={true}
      />
      <div className="btn-area">
        <div className="btn" onClick={saveTmpRubbish}>
          儲存
        </div>
        <div className="btn" onClick={cancelTmpRubbish}>
          取消
        </div>
      </div>
    </React.Fragment>
  ) : (
    splitText(rubbish)
  );

  useEffect(() => {
    if (isEditMode && hide) {
      setEditMode(false);
    }
  }, [hide, isEditMode]);

  useEffect(() => {
    if (!selectRubbish) {
      setRubbishId(makeRandomRubbishId(rubbishList));
    }
  }, [rubbishList]);

  function onChangeTmpRubbish(e) {
    setTmpRubbish({ ...tmpRubbish, text: e.target.value });
  }

  function onDoubleClickRubbish() {
    setTmpRubbish({ ...selectRubbish });
    setEditMode(true);
  }

  function cancelTmpRubbish() {
    setEditMode(false);
  }

  function saveTmpRubbish() {
    setRubbishList(
      produce(draftList => {
        const id = tmpRubbish.id;
        const target = draftList.find(r => r.id === id);
        target.text = tmpRubbish.text;
      })
    );
    setEditMode(false);
  }

  return (
    <div className={classNames('top-layer', { hide: hide })}>
      <span className={appendNightClassName('quote', dayTheme)}>“</span>
      <div
        className={classNames(
          'rubbish',
          { night: !dayTheme },
          { shadow: isEditMode }
        )}
        onDoubleClick={onDoubleClickRubbish}
      >
        {rubbishElments}
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
