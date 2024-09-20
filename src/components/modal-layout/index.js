import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ModalLayout({children, closeModel, title}) {
  const handleCloseModelOverly = (event) => {
    if (event.currentTarget === event.target) {
      closeModel();
    }
  };

  return (
    <div
      role='button'
      tabIndex={0}
      className='Modal'
      onClick={handleCloseModelOverly}
      aria-label='закрыть модальное окно'
    >
      <div className='Modal-wrapper'>
        <div className='Modal__header'>
          <h2 className='Modal__title'>{title}</h2>
          <div className='Modal__button'>
            <button onClick={closeModel}>Закрыть</button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

ModalLayout.propTypes = {
  children: PropTypes.node,
  closeModel: PropTypes.func,
  title: PropTypes.string,
};

ModalLayout.defaultProps = {
  closeModel: () => {},
};

export default React.memo(ModalLayout);
