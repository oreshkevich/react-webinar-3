import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';
import ItemProduct from '../../components/item-product';
import BasketTool from '../../components/basket-tool';

function ProductDetails() {
  const params = useParams();

  const store = useStore();

  useEffect(() => {
    store.actions.product.loadProduct(params.id);
  }, [params.id]);

  const select = useSelector(state => ({
    productList: state.product.productList,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  return (
    <PageLayout>
      <Head title={select.productList.title} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <ItemProduct productList={select.productList} onAdd={callbacks.addToBasket} />
    </PageLayout>
  );
}

export default memo(ProductDetails);
