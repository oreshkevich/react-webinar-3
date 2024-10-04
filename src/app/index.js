import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import Profile from './profile';
import Protected from '../components/protected';
import useStore from '../hooks/use-store';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();
  const activeModal = useSelector(state => state.modals.name);
  const select = useSelector(state => ({
    data: state.authorization.dataUserInfo,
  }));
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      store.actions.verifyToken.verifyToken(token);
    }
  }, [token, select.data]);
  useEffect(() => {
    store.actions.catalog.setAllCategories();
  }, []);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />} />
        <Route element={<Protected />}>
          <Route path={'/profile'} element={<Profile />} />
        </Route>
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
