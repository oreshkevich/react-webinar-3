import { memo, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import LoginForm from '../../components/login-form';
import ButtonEnter from '../../components/button-enter';

function Login() {
  const store = useStore();

  const select = useSelector(state => ({
    error: state.authorization.error,
    data: state.getAuthorization.getData,
  }));

  const callbacks = {
    submitAuthorization: useCallback(
      userData => store.actions.authorization.submitAuthorization(userData),
      [store],
    ),
    exitAuthorization: useCallback(
      () => store.actions.getAuthorization.exitAuthorization(),
      [store],
    ),
  };
  const { t } = useTranslate();

  return (
    <PageLayout>
      <ButtonEnter
        linkLogin={`/login`}
        linkProfile={`/profile`}
        t={t}
        dataAuthorization={select.data}
        onExit={callbacks.exitAuthorization}
      />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm t={t} error={select.error} onSubmitAuthorization={callbacks.submitAuthorization} />
    </PageLayout>
  );
}

export default memo(Login);
