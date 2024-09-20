import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { formatAmount } from '../../utils';

function Item(props) {
  const callbacks = {
    actionButton: e => {
      e.stopPropagation();
      props.actionButton(props.item.code);
    },
  };

  return (
    <div className="Item">
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">
        {props.item.title}
        <span className="Item-price">{`${formatAmount(props.item.price)} ₽`}</span>
      </div>
      {props.item.quantity && <span className="Item-quantity">{props.item.quantity}&nbsp;шт</span>}
      <div className="Item-actions">
        <button onClick={callbacks.actionButton}>{props.buttonName}</button>
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
  actionButton: PropTypes.func,
};

Item.defaultProps = {
  actionButton: () => {},
};

export default React.memo(Item);
