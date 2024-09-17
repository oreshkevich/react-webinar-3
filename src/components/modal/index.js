import React from 'react';
import CheckoutItem from '../checkout-item';
import PropTypes from 'prop-types';
import './style.css';

const Modal = ({closeModel, cartItems, removeItem, sumCart}) => {
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
          <h2 className='Modal__title'>Корзина</h2>
          <div className='Modal__button'>
            <button onClick={closeModel}>Закрыть</button>
          </div>
        </div>
        <div className='Modal__margin'></div>
        {cartItems.map((value) => (
          <CheckoutItem key={value.code} {...value} removeItem={removeItem} />
        ))}
        <div className='Modal__total'>
          Итого <span>{sumCart} ₽</span>
        </div>
        <div className='Modal__margin-bottom'></div>
      </div>
    </div>
  );
};
Modal.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
    })
  ).isRequired,
  sumCart: PropTypes.string,
  closeModel: PropTypes.func,
  removeItem: PropTypes.func,
};

Modal.defaultProps = {
  closeModel: () => {},
  removeItem: () => {},
};

export default React.memo(Modal);
