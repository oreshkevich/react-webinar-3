import StoreModule from '../module';

class Language extends StoreModule {
  initState() {
    return { lang: 'ru' };
  }

  changeLang(lang) {
    this.setState({ lang: lang });
  }
}

export default Language;
