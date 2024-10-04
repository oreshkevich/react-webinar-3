import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileDescription({ dataProfile, t }) {
  const cn = bem('ProfileDescription');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('profile')}</h2>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('name')}:</div>
        <div className={cn('value')}>{dataProfile?.profile?.name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('phone')}:</div>
        <div className={cn('value')}>{dataProfile?.profile?.phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('email')}:</div>
        <div className={cn('value')}>{dataProfile?.email}</div>
      </div>
    </div>
  );
}

ProfileDescription.propTypes = {
  t: PropTypes.func,
  dataProfile: PropTypes.object,
};

ProfileDescription.defaultProps = {
  t: text => text,
};

export default memo(ProfileDescription);
