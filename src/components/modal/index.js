import React from 'react';
import List from '../list';
import PropTypes from 'prop-types';
import ModalLayout from '../modal-layout';
import './style.css';

const Modal = ({closeModel, cartItems, removeItem, sumCart}) => {
  return (
    <ModalLayout closeModel={closeModel} title='Корзина'>
      <div className='Modal__basket'>
        <div className='Modal__margin'></div>
        <List list={cartItems} actionButton={removeItem} buttonName='Удалить' />
        <div className='Modal__total'>
          Итого <span>{sumCart} ₽</span>
        </div>
        <div className='Modal__margin-bottom'></div>
      </div>
    </ModalLayout>
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
  closeModel: PropTypes.func,
  removeItem: PropTypes.func,
  sumCart: PropTypes.string,
};

Modal.defaultProps = {
  closeModel: () => {},
};

export default React.memo(Modal);
