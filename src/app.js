import React, { useCallback, useState, useEffect } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  const [cartItems, setCartItems] = useState([]);
  const [sumCart, setSumCart] = useState(0);

  const addToOrder = (item, quantity = 1) => {
    const itemIndex = cartItems.findIndex(value => value.code === item);
    if (itemIndex < 0) {
      const cardsFilter = list.filter(value => value.code === item);
      const newItem = {
        ...cardsFilter,
        code: item,
        quantity: quantity,
      };
      setCartItems([...cartItems, newItem]);
    } else {
      const newItem = {
        ...cartItems[itemIndex],
        quantity: cartItems[itemIndex].quantity + quantity,
      };
      const newCart = cartItems.slice();
      newCart.splice(itemIndex, 1, newItem);
      setCartItems(newCart);
    }
  };

  const quantityOfProduct = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const sumItem = cart => {
    const sum = cart.reduce((accumulatedQuantity, cartItem) => {
      return accumulatedQuantity + cartItem.quantity * cartItem[0].price;
    }, 0);

    setSumCart(sum.toFixed());
  };

  const removeItem = cart => {
    const cartFilterItem = cartItems.filter(cartItem => cartItem.code !== cart);
    setCartItems(cartFilterItem);
  };
  useEffect(() => {
    sumItem(cartItems);
  }, [cartItems]);

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        quantityOfProduct={quantityOfProduct}
        sumCart={sumCart}
        cartItems={cartItems}
        removeItem={removeItem}
      />
      <List list={list} addToOrder={addToOrder} />
    </PageLayout>
  );
}

export default App;
