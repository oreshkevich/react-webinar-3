import { memo, useCallback, useMemo } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import { filterCategory } from '../../utils';

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    dataCategories: state.catalog.dataCategories,
    category: state.catalog.params.category,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    onSortALL: useCallback(
      category => store.actions.catalog.setParams({ category, page: 1 }),
      [store],
    ),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const options = {
    sort: useMemo(
      () => [
        { value: 'order', title: 'По порядку' },
        { value: 'title.ru', title: 'По именованию' },
        { value: '-price', title: 'Сначала дорогие' },
        { value: 'edition', title: 'Древние' },
      ],
      [],
    ),
    sortAll: useMemo(
      () => [
        { value: '', title: 'Все' },
        ...filterCategory(select.dataCategories).map(item => ({
          title: `${item.dash} ${item.title}`,
          value: item._id,
        })),
      ],
      [select.dataCategories],
    ),
  };

  const { t } = useTranslate();

  return (
    <SideLayout padding="medium">
      <Select options={options.sortAll} value={select.category} onChange={callbacks.onSortALL} />
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={'Поиск'}
        delay={1000}
        theme="big"
      />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
