import React, { useState } from 'react';
import produce from 'immer';
import classNames from 'classnames';
import { MdArrowForward, MdModeEdit, MdDelete } from 'react-icons/md';

import ToggleTheme from '../../ToogleTheme/ToogleTheme';

const SideBar = ({
  show,
  dayTheme,
  setDayTheme,
  setIsShowSideBar,
  rubbishList,
  setRubbishList
}) => {
  const [editRubbish, setEdditRubish] = useState({});
  const [maxDisplayNum, setMaxDisplayNum] = useState(5);
  const displayList = rubbishList.slice(0, maxDisplayNum);
  const canLoadMore = maxDisplayNum < rubbishList.length;

  function loadMoreRubbish() {
    setMaxDisplayNum(maxDisplayNum + 5);
  }

  function toEditRubbish(e) {
    if (editRubbish) {
      const text = e.target.value;
      setEdditRubish({ ...editRubbish, text });
    }
  }

  function onEditComplete() {
    setRubbishList(
      produce(rubbishList, draftList => {
        if (editRubbish.text.trim().length === 0) {
          return draftList.filter(r => r.id !== editRubbish.id);
        }
        const target = draftList.find(r => r.id === editRubbish.id);
        target.text = editRubbish.text;
      })
    );
    setEdditRubish({});
  }

  function onKeyDown(e) {
    if (e.keyCode === 13) {
      onEditComplete();
    }
  }

  function onBlur() {
    onEditComplete();
  }

  function deleteRubishById(id) {
    setRubbishList(rubbishList.filter(r => r.id !== id));
  }

  return (
    <div
      className={classNames('sidebar', { hide: !show }, { dark: !dayTheme })}
    >
      <div>
        <MdArrowForward
          size={48}
          className="toggle-icon"
          onClick={() => setIsShowSideBar(false)}
        />
      </div>
      <div className="content">
        <div className="title-row">
          <h2 className="title">夜間模式</h2>
          <ToggleTheme dayTheme={dayTheme} setDayTheme={setDayTheme} />
        </div>
        <div className="table">
          <div className="table-title">我的語錄</div>
          <div className="table-body">
            {displayList.map(obj => (
              <div className="quote-row" key={obj.id}>
                {obj.id === editRubbish.id ? (
                  <input
                    type="text"
                    className="quote-input"
                    value={editRubbish.text}
                    onChange={toEditRubbish}
                    onBlur={onBlur}
                    onKeyDown={onKeyDown}
                    autoFocus={true}
                  />
                ) : (
                  <span className="quote">{obj.text}</span>
                )}
                <div className="quote-btn-block">
                  <MdModeEdit
                    size={32}
                    title="Edit quote"
                    onClick={() => setEdditRubish({ ...obj })}
                  />
                  <MdDelete
                    size={32}
                    title="Delete quote"
                    onClick={() => deleteRubishById(obj.id)}
                  />
                </div>
              </div>
            ))}
            {canLoadMore && (
              <div className="load-more-row" onClick={loadMoreRubbish}>
                <span className="load-more-btn">載入更多</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
