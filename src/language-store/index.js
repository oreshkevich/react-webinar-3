import { useCallback } from 'react';
import useSelector from '../store/use-selector';

export const ObjectWords = {
  en: {
    shop: 'Shop',
    main: 'Main',
    inBasket: 'In the basket:',
    basket: 'Basket',
    empty: 'empty',
    productOne: 'product',
    productFew: 'products',
    productMany: 'products',
    total: 'Total',
    goOver: 'Go over',
    add: 'Add',
    toClose: 'To close',
    remove: 'Remove',
  },
  ru: {
    shop: 'Магазин',
    main: 'Главная',
    inBasket: 'В корзине:',
    basket: 'Корзина',
    empty: 'пусто',
    productOne: 'товар',
    productFew: 'товара',
    productMany: 'товаров',
    total: 'Итого',
    goOver: 'Перейти',
    add: 'Добавить',
    toClose: 'Закрыть',
    remove: 'Удалить',
  },
};

export function useTranslate() {
  const select = useSelector(state => ({
    lang: state.language.lang,
  }));

  return useCallback(
    str => {
      return ObjectWords[select.lang][str] || null;
    },
    [select.lang],
  );
}
