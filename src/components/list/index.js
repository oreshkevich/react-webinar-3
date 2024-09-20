import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list, actionButton, buttonName }) {
  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
          <Item item={item} actionButton={actionButton} buttonName={buttonName} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  actionButton: PropTypes.func,
  buttonName: PropTypes.string,
};

List.defaultProps = {
  actionButton: () => {},
};

export default React.memo(List);
