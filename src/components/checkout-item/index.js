import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const CheckoutItem = (props) => {
  return (
    <div className='Checkout-item'>
      <div className='Checkout-elem'>
        <span className='Checkout-elem__code'>{props[0].code}</span>
        <span className='Checkout-elem__title'>{props[0].title}</span>
      </div>
      <div className='Checkout-elem'>
        <span className='Checkout-elem__price'>{props[0].price} ₽</span>
        <span className='Checkout-elem__quantity'>{props.quantity} шт</span>

        <button onClick={() => props.removeItem(props.code)}>Удалить</button>
      </div>
    </div>
  );
};
CheckoutItem.propTypes = {
  0: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  code: PropTypes.number,
  quantity: PropTypes.number,
  removeItem: PropTypes.func,
};

CheckoutItem.defaultProps = {
  removeItem: () => {},
};

export default React.memo(CheckoutItem);
