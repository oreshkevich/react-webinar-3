import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function ButtonEnter({ t, linkLogin, linkProfile, dataAuthorization, onExit }) {
  const cn = bem('ButtonEnter');

  const valueBoolean = Object.entries(dataAuthorization).length;

  return (
    <div className={cn()}>
      {valueBoolean !== 0 && (
        <div>
          <Link className={cn('link')} to={linkProfile}>
            {dataAuthorization.profile?.name}
          </Link>
          <Link to={'/login'}>
            <button onClick={onExit}>{t('basket.exit')}</button>
          </Link>
        </div>
      )}
      {valueBoolean === 0 && (
        <Link to={linkLogin}>
          <button>{t('basket.entrance')}</button>
        </Link>
      )}
    </div>
  );
}

ButtonEnter.propTypes = {
  t: PropTypes.func,
};

ButtonEnter.defaultProps = {
  t: text => text,
};

export default memo(ButtonEnter);
