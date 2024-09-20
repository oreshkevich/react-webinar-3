import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { plural } from '../../utils';
import './style.css';

function Controls({ quantityOfProduct, sumCart, openModelFormChange }) {
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
    </div>
  );
}

Controls.propTypes = {
  openModelFormChange: PropTypes.func,
  sumCart: PropTypes.string,
  quantityOfProduct: PropTypes.number,
};

Controls.defaultProps = {
  openModelFormChange: () => {},
};

export default React.memo(Controls);
