import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Menu from '../menu';
import { useTranslate } from '../../language-store';
import './style.css';

function BasketTool({ sum, amount, onOpen }) {
  const cn = bem('BasketTool');
  const t = useTranslate();

  return (
    <div className={cn()}>
      <Menu />
      <div>
        <span className={cn('label')}>{t('inBasket')}</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
                one: `${t('productOne')}`,
                few: `${t('productFew')}`,
                many: `${t('productMany')}`,
              })} / ${numberFormat(sum)} ₽`
            : `${t('empty')}`}
        </span>
        <button onClick={onOpen}>{t('goOver')}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
