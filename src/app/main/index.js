import { memo, useCallback, useEffect, useState } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import ChangeLang from '../../components/changeLang';
import { useTranslate } from '../../language-store';
function Main() {
  const store = useStore();
  useEffect(() => {
    store.actions.catalog.load(select.pageSkip);
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    listCount: state.catalog.listCount,
    pageSkip: state.catalog.pageSkip,
    amount: state.basket.amount,
    sum: state.basket.sum,
    pageNow: state.pagination.pageNow,
    lang: state.language.lang,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

    setPageNow: useCallback(page => store.actions.pagination.setPageNow(page), [store]),
    handlerChangeLang: useCallback(lang => store.actions.language.changeLang(lang), [store]),
  };

  const pageNameArticles = '/articles/';
  const renders = {
    item: useCallback(
      item => {
        return (
          <Item pageNameArticles={pageNameArticles} item={item} onAdd={callbacks.addToBasket} />
        );
      },
      [callbacks.addToBasket],
    ),
  };

  const addPageItem = page => {
    store.actions.catalog.load(page);
  };
  const numberOfProducts = 10;
  const pagesCount = Math.ceil(select.listCount / numberOfProducts);

  const t = useTranslate();

  return (
    <PageLayout>
      <ChangeLang handlerChangeLang={callbacks.handlerChangeLang} />
      <Head title={t('shop')} />

      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        numberOfProducts={numberOfProducts}
        pagesCount={pagesCount}
        pageNow={select.pageNow}
        setPageNow={callbacks.setPageNow}
        addPageItem={addPageItem}
      />
    </PageLayout>
  );
}

export default memo(Main);
