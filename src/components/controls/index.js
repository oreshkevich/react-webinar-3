import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { useTranslate } from '../../language-store';

function Controls({ onAdd }) {
  const t = useTranslate();
  return (
    <div className="Controls">
      <button onClick={() => onAdd()}>{t('add')}</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

Controls.defaultProps = {
  onAdd: () => {},
};

export default memo(Controls);
