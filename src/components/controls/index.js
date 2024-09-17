import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal';
import { plural } from '../../utils';
import './style.css';

function Controls({ quantityOfProduct, sumCart, cartItems, removeItem }) {
  const [isModalChange, setModalChange] = useState(false);
  const openModelFormChange = e => {
    setModalChange(true);
  };
  const closeModel = () => {
    setModalChange(false);
  };
  return (
    <div className="Controls">
      <div className="Controls__item">
        {' '}
        В корзине:{' '}
        <span className="Controls__quantity">
          {quantityOfProduct
            ? `${quantityOfProduct} ${plural(quantityOfProduct, {
                one: 'товар',
                few: 'товара',
                many: 'товаров',
              })} / ${sumCart} ₽`
            : 'пусто'}
        </span>
      </div>
      <button onClick={openModelFormChange}>Перейти</button>
      {isModalChange && (
        <Modal
          removeItem={removeItem}
          closeModel={closeModel}
          cartItems={cartItems}
          sumCart={sumCart}
        />
      )}
    </div>
  );
}

Controls.propTypes = {
  removeItem: PropTypes.func,
};

Controls.defaultProps = {
  removeItem: () => {},
};

export default React.memo(Controls);
