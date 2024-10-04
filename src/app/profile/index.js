import { memo, useCallback, useEffect, useMemo } from 'react';
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
import ButtonEnter from '../../components/button-enter';
import ProfileDescription from '../../components/profile-description';

function Profile() {
  const store = useStore();

  const select = useSelector(state => ({
    getData: state.verifyToken.getData,
  }));
  const callbacks = {
    clearUserInfo: useCallback(() => store.actions.verifyToken.clearUserInfo(), [store]),
  };
  const { t } = useTranslate();

  return (
    <PageLayout>
      <ButtonEnter
        linkLogin={`/login`}
        linkProfile={`/profile`}
        t={t}
        dataAuthorization={select.getData}
        onExit={callbacks.clearUserInfo}
      />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>

      <Navigation />
      <ProfileDescription t={t} dataProfile={select.getData} />
    </PageLayout>
  );
}

export default memo(Profile);
