import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      listCount: [],
      pageSkip: 0,
    };
  }

  async load(page) {
    const response = await fetch(
      `/api/v1/articles?limit=10&skip=${page}&fields=items(_id, title, price),count`,
    );
    if (!response.ok) {
      throw new Error('Ошибка при загрузке данных');
    }
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        listCount: json.result.count,
        pageSkip: page,
      },
      'Загружены товары из АПИ',
    );
  }
  catch(error) {
    console.error(error);
  }
}

export default Catalog;
