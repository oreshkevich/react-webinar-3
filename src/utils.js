/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function filterCategory(data) {
  const arrayCategories = data.map(item => {
    return { ...item, children: [] };
  });

  for (let i = 0; i < arrayCategories.length; i++) {
    let uniqueId = arrayCategories[i]._id;
    for (let x = 0; x < arrayCategories.length; x++) {
      if (arrayCategories[x].parent) {
        let nameId = arrayCategories[x].parent._id;
        if (uniqueId == nameId) {
          arrayCategories[i].children.push(arrayCategories[x]);
        }
      }
    }
  }

  const arrClear = items => {
    let result = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].parent === null) {
        result.push(items[i]);
      }
    }

    return result;
  };
  let arrFilterCategory = arrClear(arrayCategories);

  const flattenTree = (arr, result, dash) => {
    for (let i = 0; i < arr.length; i++) {
      result.push({ ...arr[i], dash });

      if (arr[i].children.length) {
        flattenTree(arr[i].children, result, dash + '- ');
      }
    }
  };

  let result = [];

  flattenTree(arrFilterCategory, result, '');

  return result;
}
