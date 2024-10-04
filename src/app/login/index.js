import { memo, useCallback, useMemo } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';
import LoginForm from '../../components/login-form';
import ButtonEnter from '../../components/button-enter';

function Login() {
  const store = useStore();

  const select = useSelector(state => ({
    error: state.authorization.error,
    data: state.verifyToken.getData,
  }));

  const callbacks = {
    submitAuthorization: useCallback(
      userData => store.actions.authorization.submitAuthorization(userData),
      [store],
    ),
    clearUserInfo: useCallback(() => store.actions.verifyToken.clearUserInfo(), [store]),
  };

  const { t } = useTranslate();

  return (
    <PageLayout>
      <ButtonEnter
        linkLogin={`/login`}
        linkProfile={`/profile`}
        t={t}
        dataAuthorization={select.data}
        onExit={callbacks.clearUserInfo}
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
