import React from 'react';
import { createRoot } from 'react-dom/client';
import { spawnCode } from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    { code: spawnCode(), counter: 0, title: 'Название элемента' },
    { code: spawnCode(), counter: 0, title: 'Некий объект' },
    { code: spawnCode(), counter: 0, title: 'Заголовок' },
    {
      code: spawnCode(),
      counter: 0,
      title: 'Очень длинное название элемента из семи слов',
    },
    { code: spawnCode(), counter: 0, title: 'Запись' },
    { code: spawnCode(), counter: 0, title: 'Шестая запись' },
    { code: spawnCode(), counter: 0, title: 'Седьмая запись' },
  ],
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
