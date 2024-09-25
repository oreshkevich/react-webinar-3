import StoreModule from '../module';

class Pagination extends StoreModule {
  initState() {
    return {
      pageNow: 1,
    };
  }
  setPageNow(newState) {
    this.setState({ pageNow: newState });
  }
}

export default Pagination;
