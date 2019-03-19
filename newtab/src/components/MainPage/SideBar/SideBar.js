import React from 'react';
import classNames from 'classnames';
import { MdArrowForward, MdModeEdit, MdDelete } from 'react-icons/md';

import ToggleTheme from '../../ToogleTheme/ToogleTheme';

const SideBar = ({ show, dayTheme, setDayTheme, setIsShowSideBar }) => {
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
          <h2 className="title">Dark mode</h2>
          <ToggleTheme dayTheme={dayTheme} setDayTheme={setDayTheme} />
        </div>
        <div className="table">
          <div className="table-title">Quotes</div>
          <div className="table-body">
            <div className="quote-row">
              <span className="quote">Stay hungry; stay foolish.</span>
              <div className="quote-btn-block">
                <MdModeEdit size={32} title="Edit quote" />
                <MdDelete size={32} title="Delete quote" />
              </div>
            </div>
            <div className="quote-row">
              <span className="quote">Stay hungry; stay foolish.</span>
              <div className="quote-btn-block">
                <MdModeEdit size={32} title="Edit quote" />
                <MdDelete size={32} title="Delete quote" />
              </div>
            </div>
            <div className="quote-row">
              <span className="quote">Stay hungry; stay foolish.</span>
              <div className="quote-btn-block">
                <MdModeEdit size={32} title="Edit quote" />
                <MdDelete size={32} title="Delete quote" />
              </div>
            </div>
            <div className="quote-row">
              <span className="quote">Stay hungry; stay foolish.</span>
              <div className="quote-btn-block">
                <MdModeEdit size={32} title="Edit quote" />
                <MdDelete size={32} title="Delete quote" />
              </div>
            </div>
            <div className="quote-row">
              <span className="quote">
                You are what you do, not what you say you’ll do.
              </span>
              <div className="quote-btn-block">
                <MdModeEdit size={32} title="Edit quote" />
                <MdDelete size={32} title="Delete quote" />
              </div>
            </div>
            <div className="load-more-row">
              <span className="load-more-btn">LOAD MORE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
