import { memo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function LoginForm({ error, t, onSubmitAuthorization }) {
  const cn = bem('LoginForm');
  const [formInputsValidity, setFormInputsValidity] = useState({
    login: true,
    password: true,
  });
  const isEmpty = value => value.trim() === '';
  const loginInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = event => {
    event.preventDefault();
    const enteredLogin = loginInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const enteredLoginIsValid = !isEmpty(enteredLogin);
    const enteredPasswordIsValid = !isEmpty(enteredPassword);

    setFormInputsValidity({
      login: enteredLoginIsValid,
      password: enteredPasswordIsValid,
    });

    const formIsValid = enteredLoginIsValid && enteredPasswordIsValid;

    if (!formIsValid) {
      return;
    }
    const objData = {
      login: enteredLogin,
      password: enteredPassword,
    };
    onSubmitAuthorization(objData);
    loginInputRef.current.value = '';
    passwordInputRef.current.value = '';
  };
  const loginControlClasses = `form-control ${formInputsValidity.login ? '' : 'invalid-input'} `;
  const passwordControlClasses = `form-control ${
    formInputsValidity.password ? '' : 'invalid-input'
  } `;

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Вход</h2>
      <form className={cn('form')} onSubmit={submitHandler}>
        <div>
          <label className={cn('form-label')} htmlFor="formBasicEmail">
            Логин
          </label>
          <input
            name="login"
            id="formBasicEmail"
            className={cn(loginControlClasses)}
            ref={loginInputRef}
          />
          <div>
            {formInputsValidity.login ? (
              <p className={cn('form-error')}></p>
            ) : (
              <p className={cn('error')}>Минимальная длина 1 символ</p>
            )}
          </div>
        </div>
        <div className={cn('form-wrap')}>
          <label className={cn('form-label')} htmlFor="formBasicPassword">
            Пароль
          </label>
          <input
            name="password"
            type="password"
            id="formBasicPassword"
            className={cn(passwordControlClasses)}
            ref={passwordInputRef}
          />
          <div>
            {formInputsValidity.password ? (
              <p className={cn('form-error')}></p>
            ) : (
              <p className={cn('error')}>Минимальная длина 1 символ</p>
            )}
          </div>
        </div>
        <div>
          <p className={cn('form-error')}>{error}</p>
        </div>
        <button type="submit" className={cn('submit')}>
          {t('basket.enter')}
        </button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  t: PropTypes.func,
};

LoginForm.defaultProps = {
  t: text => text,
};

export default memo(LoginForm);
