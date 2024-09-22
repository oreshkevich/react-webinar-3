import React, { useCallback, useState, useEffect } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import ModalBasket from './components/modal-basket';
import { formatAmount } from './utils';
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cartItems = store.getState().cartItems;

  const [isModalChange, setModalChange] = useState(false);

  const openModelFormChange = e => {
    setModalChange(true);
  };
  const closeModel = () => {
    setModalChange(false);
  };
  const callbacks = {
    onAddItem: useCallback(
      code => {
        store.addToOrder(code);
      },
      [store],
    ),
    onRemoveItem: useCallback(
      code => {
        store.removeCartItem(code);
      },
      [store],
    ),
  };

  const quantityOfProduct = store.getQuantityOfProduct();
  const totalPrice = store.getSumItem();
  const sumCart = formatAmount(totalPrice);

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        quantityOfProduct={quantityOfProduct}
        sumCart={sumCart}
        openModelFormChange={openModelFormChange}
      />
      {isModalChange && (
        <ModalBasket
          closeModel={closeModel}
          cartItems={cartItems}
          removeItem={callbacks.onRemoveItem}
          sumCart={sumCart}
        ></ModalBasket>
      )}
      <List list={list} actionButton={callbacks.onAddItem} buttonName="Добавить" />
    </PageLayout>
  );
}

export default App;
