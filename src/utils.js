const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}
export const getSize = (quantity, { one, much, count }) => {
  while (quantity > 20) {
    quantity = quantity.toString().slice(-1);
    quantity = parseInt(quantity);
  }
  if (quantity === 1) {
    return one;
  }
  if (quantity > 1 && quantity <= 4) {
    return much;
  }
  if (quantity >= 5 && quantity <= 20) {
    return count;
  }

  return count;
};
