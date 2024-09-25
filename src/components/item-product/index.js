import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { useTranslate } from '../../language-store';

function ItemProduct(props) {
  const cn = bem('ItemProduct');

  const callbacks = {
    onAdd: e => props.onAdd(props.productList._id),
  };
  const t = useTranslate();
  return (
    <div className={cn()}>
      <div className={cn('wrap')}>
        <p className={cn('description')}>{props.productList.description}</p>
        <p className={cn('made-text')}>
          Страна производитель:{' '}
          <span>
            {props.productList.madeIn?.title}({props.productList.madeIn?.code}
          </span>
          )
        </p>
        <p className={cn('category-text')}>
          Категория: <span>{props.productList.category?.title}</span>
        </p>
        <p className={cn('edition')}>
          Год выпуска: <span>{props.productList.edition}</span>
        </p>
        <p className={cn('price')}>Цена: {props.productList.price}</p>
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onAdd}>{t('add')}</button>
      </div>
    </div>
  );
}

ItemProduct.propTypes = {
  productList: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.number,
    edition: PropTypes.number,
    description: PropTypes.string,
    madeIn: PropTypes.object,
    category: PropTypes.object,
  }).isRequired,
  onAdd: PropTypes.func,
};

ItemProduct.defaultProps = {
  onAdd: () => {},
};

export default memo(ItemProduct);
