import { memo } from 'react';
import './style.css';

function ChangeLang({ handlerChangeLang }) {
  return (
    <div>
      <button onClick={() => handlerChangeLang('ru')}>ru</button>
      <button onClick={() => handlerChangeLang('en')}>en</button>
    </div>
  );
}

export default memo(ChangeLang);
