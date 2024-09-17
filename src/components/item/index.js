import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item(props) {
  const callbacks = {
    addToOrder: e => {
      e.stopPropagation();
      props.addToOrder(props.item.code);
    },
  };

  return (
    <div className="Item">
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">
        {props.item.title}
        <span className="Item-price">{`${props.item.price} ₽`}</span>
      </div>
      <div className="Item-actions">
        <button onClick={callbacks.addToOrder}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  addToOrder: PropTypes.func,
};

Item.defaultProps = {
  addToOrder: () => {},
};

export default React.memo(Item);
