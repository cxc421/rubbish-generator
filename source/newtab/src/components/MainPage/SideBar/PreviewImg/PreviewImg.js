import React, { useRef } from 'react';
import classNames from 'classnames';

const PreviewImg = ({ imgSrc, setImgSrc, dayTheme }) => {
  const fileInputRef = useRef(null);

  function handleOnClick() {
    fileInputRef.current.click();
  }

  function onInputFileChange(e) {
    const input = fileInputRef.current;
    console.log('change');
    if (input.files && input.files[0]) {
      console.log('have file');
      var reader = new FileReader();

      reader.onload = function(e) {
        setImgSrc(e.target.result);
        input.value = '';
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  return (
    <div className="preview-img" onClick={handleOnClick}>
      <div className={classNames('mask', { dark: !dayTheme })}>
        <span>點擊上傳</span>
      </div>
      <img src={imgSrc} alt="" />
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={onInputFileChange}
      />
    </div>
  );
};

export default PreviewImg;
