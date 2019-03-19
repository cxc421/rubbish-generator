import React, { useEffect, useState } from 'react';
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
  const [editRubbishId, setEdditRubbishId] = useState(null);
  const [maxDisplayNum, setMaxDisplayNum] = useState(5);
  const displayList = rubbishList.slice(0, maxDisplayNum);
  const canLoadMore = maxDisplayNum < rubbishList.length;

  function loadMoreRubbish() {
    setMaxDisplayNum(maxDisplayNum + 5);
  }

  function editRubbish(e) {
    if (editRubbishId) {
      const text = e.target.value;
      setRubbishList(
        produce(draftList => {
          draftList.find(r => r.id === editRubbishId).text = text;
        })
      );
    }
  }

  function onKeyDown(e) {
    if (e.keyCode === 13) {
      setEdditRubbishId(null);
    }
  }

  function onBlur() {
    setEdditRubbishId(null);
  }

  function deleteRubbishById(id) {
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
                {obj.id === editRubbishId ? (
                  <input
                    type="text"
                    className="quote-input"
                    value={obj.text}
                    onChange={editRubbish}
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
                    onClick={() => setEdditRubbishId(obj.id)}
                  />
                  <MdDelete
                    size={32}
                    title="Delete quote"
                    onClick={() => deleteRubbishById(obj.id)}
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
