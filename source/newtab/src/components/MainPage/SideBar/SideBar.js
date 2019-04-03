import React, { useState } from 'react';
import produce from 'immer';
import classNames from 'classnames';
import { MdArrowForward, MdModeEdit, MdDelete } from 'react-icons/md';

import ToggleTheme from '../../ToogleTheme/ToogleTheme';
import PreviewImg from './PreviewImg/PreviewImg';

const SideBar = ({
  show,
  dayTheme,
  setDayTheme,
  setIsShowSideBar,
  rubbishList,
  setRubbishList,
  bgDaySrc,
  bgNightSrc,
  setBackground
}) => {
  const [previewBgDaySrc, setPreviewBgDaySrc] = useState(bgDaySrc);
  const [previewBgNightSrc, setPreviewBgNightSrc] = useState(bgNightSrc);
  const [isEditQuoteMode, setIsEditQuoteMode] = useState(true);
  const [editRubbish, setEdditRubish] = useState({});
  const [maxDisplayNum, setMaxDisplayNum] = useState(5);
  const displayList = rubbishList.slice(0, maxDisplayNum);
  const canLoadMore = maxDisplayNum < rubbishList.length;
  const editQouteAreaStyle = {
    visibility: isEditQuoteMode ? 'visible' : 'hidden',
    opacity: isEditQuoteMode ? 1 : 0,
    transitionDuration: isEditQuoteMode ? '1600ms' : '400ms'
  };
  const editBgAreaStyle = {
    visibility: !isEditQuoteMode ? 'visible' : 'hidden',
    opacity: !isEditQuoteMode ? 1 : 0,
    transitionDuration: !isEditQuoteMode ? '1600ms' : '400ms'
  };
  const bgDayIsChange = previewBgDaySrc !== bgDaySrc;
  const bgNightIsChange = previewBgNightSrc !== bgNightSrc;
  const previewChange = bgDayIsChange || bgNightIsChange;
  console.log({ previewChange });

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

  function handleSaveBackground() {
    setBackground({
      bgDaySrc: previewBgDaySrc,
      bgNightSrc: previewBgNightSrc
    });
  }

  function resetBackground() {
    setPreviewBgDaySrc(bgDaySrc);
    setPreviewBgNightSrc(bgNightSrc);
  }

  return (
    <div
      className={classNames('sidebar', { hide: !show }, { dark: !dayTheme })}
    >
      <div className="sidebar-top-row">
        <MdArrowForward
          size={48}
          className="toggle-icon"
          onClick={() => setIsShowSideBar(false)}
        />
        <div
          className={classNames('toggle-setting-btn', { dark: !dayTheme })}
          onClick={() => setIsEditQuoteMode(!isEditQuoteMode)}
        >
          {isEditQuoteMode ? '設定背景' : '修改語錄'}
        </div>
      </div>
      <div className="content">
        <div style={editQouteAreaStyle}>
          <div className="title-row">
            <h2 className="title">夜間模式</h2>
            <ToggleTheme dayTheme={dayTheme} setDayTheme={setDayTheme} />
          </div>
          <div className="table">
            <div className="table-title">
              <span>我的語錄</span>
            </div>
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
        <div style={editBgAreaStyle} className="edit-bg-area">
          <div className="edit-bg-title">
            <span>日間背景</span>
            {bgDayIsChange && <span className="notify">(更改未儲存)</span>}
          </div>
          <div className="edit-bg-preview">
            <PreviewImg
              imgSrc={previewBgDaySrc}
              dayTheme={dayTheme}
              setImgSrc={imgSrc => setPreviewBgDaySrc(imgSrc)}
            />
          </div>
          <div className="edit-bg-title">
            <span>夜間背景</span>
            {bgNightIsChange && <span className="notify">(更改未儲存)</span>}
          </div>
          <div className="edit-bg-preview">
            <PreviewImg
              imgSrc={previewBgNightSrc}
              dayTheme={dayTheme}
              setImgSrc={imgSrc => setPreviewBgNightSrc(imgSrc)}
            />
          </div>
          <div className="edit-bg-btns">
            <div
              className={classNames('btn', {
                dark: !dayTheme,
                disabled: !previewChange
              })}
              onClick={handleSaveBackground}
            >
              儲存
            </div>
            <div
              className={classNames('btn', {
                dark: !dayTheme,
                disabled: !previewChange
              })}
              onClick={resetBackground}
            >
              取消
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
