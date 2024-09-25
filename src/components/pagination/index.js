import React, { useState } from 'react';
import { createPages } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function Pagination({ pagesCount, pageNow, numberOfProducts, setPageNow, addPageItem }) {
  const cn = bem('Pagination');
  const pages = [];

  const setPagination = page => {
    let skipPage = 0;
    if (page === 1) {
      skipPage = 0;
    } else if (page > 1 && page < numberOfProducts) {
      skipPage = page * numberOfProducts - numberOfProducts;
    } else {
      let str = String(page * numberOfProducts);
      skipPage = str.substring(0, str.length - 1) * numberOfProducts - numberOfProducts;
    }

    setPageNow(page);
    addPageItem(skipPage);
  };
  createPages(pages, pagesCount, pageNow);
  return (
    <div className={cn()}>
      <ul className={cn('wrap')}>
        {pages.map(item => (
          <li className={cn('item')} key={item.id}>
            <button
              disabled={item.disabled}
              className={pageNow === item.id ? cn('active') : cn('page-link')}
              onClick={() => setPagination(item.number)}
            >
              {item.number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
Pagination.propTypes = {
  pageNow: PropTypes.number,
  pagesCount: PropTypes.number,
  numberOfProducts: PropTypes.number,
  setPageNow: PropTypes.func,
  addPageItem: PropTypes.func,
};

Pagination.defaultProps = {
  setPageNow: () => {},
  addPageItem: () => {},
};
export default Pagination;
