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
  const arrayCategories = data.map(item => ({ ...item, children: [] }));
  const map = new Map(arrayCategories.map(item => [item._id, item]));

  for (const item of arrayCategories) {
    if (item.parent) {
      const parent = map.get(item.parent._id);
      if (parent) parent.children.push(item);
    }
  }

  const arrClear = items => items.filter(item => item.parent === null);

  const flattenTree = (arr, result, dash) => {
    for (const item of arr) {
      result.push({ ...item, dash });

      if (item.children.length) {
        flattenTree(item.children, result, dash + '- ');
      }
    }
  };

  const result = [];

  flattenTree(arrClear(arrayCategories), result, '');

  return result;
}

