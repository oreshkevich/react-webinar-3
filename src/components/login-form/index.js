import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function LoginForm({ error, t, onSubmitAuthorization }) {
  const cn = bem('LoginForm');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!login) {
      newErrors.login = 'Логин обязателен!';
    }
    if (!password) {
      newErrors.password = 'Пароль обязателен!';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      const objData = {
        login,
        password,
      };
      onSubmitAuthorization(objData);
      setLogin('');
      setPassword('');
    }
  };

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('signin')}</h2>
      <form className={cn('form')} onSubmit={handleSubmit}>
        <div className={cn('form-wrap')}>
          <label className={cn('form-label')} htmlFor="formLogin">
            {t('login')}
          </label>
          <input
            name="login"
            id="formLogin"
            type="text"
            value={login}
            className={cn('form-control')}
            onChange={e => setLogin(e.target.value.trim())}
          />
          {errors.login && <span style={{ color: 'red' }}>{errors.login}</span>}
        </div>
        <div className={cn('form-wrap')}>
          <label className={cn('form-label')} htmlFor="formPassword">
            {t('password')}
          </label>
          <input
            name="password"
            type="password"
            id="formPassword"
            className={cn('form-control')}
            value={password}
            onChange={e => setPassword(e.target.value.trim())}
          />
          {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
        </div>
        <div>{error && <p className={cn('form-error')}>{error}</p>}</div>
        <button type="submit" className={cn('submit')}>
          {t('basket.enter')}
        </button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  t: PropTypes.func,
  onSubmitAuthorization: PropTypes.func,
  error: PropTypes.string,
};

LoginForm.defaultProps = {
  t: text => text,
  onSubmitAuthorization: () => {},
  error: '',
};

export default memo(LoginForm);
