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

export function createPages(pages, pagesCount, currentPage) {
  if (currentPage > 3 && currentPage < pagesCount) {
    pages.push({ id: 1, number: 1 });
    pages.push({ id: Math.random(), disabled: true, number: '…' });
    let i;
    for (i = currentPage - 1; i <= currentPage + 1; i++) {
      pages.push({ id: i, number: i });

      if (i == pagesCount) {
        break;
      }
    }
    if (i !== pagesCount) {
      pages.push({ id: Math.random(), disabled: true, number: '…' });

      pages.push({
        id: Math.random(),
        number: pagesCount,
      });
    }
    if (currentPage == pagesCount - 2) {
      pages.push({
        id: Math.random(),
        number: pagesCount,
      });
    }
  } else if (currentPage == pagesCount) {
    pages.push({ id: 1, number: 1 });
    pages.push({ id: Math.random(), disabled: true, number: '…' });
    let i;
    for (i = currentPage - 2; i < currentPage + 1; i++) {
      pages.push({ id: i, number: i });

      if (i == pagesCount) {
        break;
      }
    }
  } else if (currentPage < 3) {
    let i;
    for (i = 1; i <= 3; i++) {
      pages.push({ id: i, number: i });
      if (i == pagesCount) break;
    }

    pages.push({ id: Math.random(), disabled: true, number: '…' });

    pages.push({ id: pagesCount, number: pagesCount });
  } else {
    let i;
    for (i = 1; i <= 4; i++) {
      pages.push({ id: i, number: i });
      if (i == pagesCount) break;
    }
    pages.push({ id: Math.random(), disabled: true, number: '…' });

    pages.push({ id: Math.random(), number: pagesCount });
  }
}
