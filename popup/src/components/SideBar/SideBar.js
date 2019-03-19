import React, { useEffect, useState, useRef } from 'react';
import produce from 'immer';
import classNames from 'classnames';
import { MdAdd, MdModeEdit, MdDelete } from 'react-icons/md';

import ToggleTheme from 'components/ToogleTheme/ToogleTheme';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const SideBar = ({
  show,
  dayTheme,
  setDayTheme,
  rubbishList,
  setRubbishList
}) => {
  const tableBodyRef = useRef(null);
  const [editRubbish, setEdditRubish] = useState({});
  const displayList = rubbishList;
  const prevousListLength = usePrevious(rubbishList.length);

  useEffect(() => {
    if (rubbishList.length > prevousListLength) {
      const dom = tableBodyRef.current;
      dom.scrollTop = dom.scrollHeight;
    }
  }, [rubbishList]);

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

  function onClckAddNewQuoteBtn() {
    const newId = new Date().getTime();
    setRubbishList(
      produce(rubbishList, draftList => {
        draftList.push({
          id: newId,
          text: ''
        });
      })
    );
    setEdditRubish({ id: newId, text: '' });
  }

  return (
    <div
      className={classNames('sidebar', { hide: !show }, { dark: !dayTheme })}
    >
      <div className="content">
        <div className="title-row">
          <h2 className="title">夜間模式</h2>
          <ToggleTheme dayTheme={dayTheme} setDayTheme={setDayTheme} />
        </div>
        <div className="table">
          <div className="table-title">我的語錄</div>
          <div className="table-body" ref={tableBodyRef}>
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
          </div>
          <div className="add-quote-row">
            <div
              className={classNames('add-quote-btn', { dark: !dayTheme })}
              onClick={onClckAddNewQuoteBtn}
            >
              <MdAdd />
              <span>新增語錄</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
