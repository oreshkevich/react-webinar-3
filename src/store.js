import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  addToOrder(item, quantity = 1) {
    const cartItems = this.state.cartItems;
    const list = this.state.list;

    const itemIndex = cartItems.findIndex(value => value.code === item);
    if (itemIndex < 0) {
      const cardsFilter = list.filter(value => value.code === item);
      const newItem = {
        ...cardsFilter[0],
        code: item,
        quantity: quantity,
        quantityUnique: quantity,
      };
      this.setState({
        ...this.state,
        cartItems: [...cartItems, newItem],
      });
    } else {
      const newItem = {
        ...cartItems[itemIndex],
        quantity: cartItems[itemIndex].quantity + quantity,
      };
      const newCart = cartItems.slice();
      newCart.splice(itemIndex, 1, newItem);
      this.setState({
        ...this.state,
        cartItems: [...newCart],
      });
    }
  }

  removeItem(cart) {
    const cartFilterItem = this.state.cartItems.filter(cartItem => cartItem.code !== cart);
    this.setState({
      ...this.state,
      cartItems: cartFilterItem,
    });
  }

  getSumItem() {
    const sum = this.state.cartItems.reduce((accumulatedQuantity, cartItem) => {
      return accumulatedQuantity + cartItem.quantity * cartItem.price;
    }, 0);
    return sum;
  }

  getQuantityOfProduct() {
    const quantityOfProduct = this.state.cartItems.reduce(
      (sum, item) => sum + item.quantityUnique,
      0,
    );
    return quantityOfProduct;
  }
}

export default Store;
