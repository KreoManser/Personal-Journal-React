import './App.css';
import Button from './components/Button/button';
import Header from './components/Header/Header';
import Body from './layout/Body/Body';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import LeftPanel from './layout/LeftPanel/LeftPanel';
import JournalList from './components/JournalList/JournalList';
import JournalForm from './components/JournalForm/JournalForm';
import { useState } from 'react';

const INITIAL_DATA = [
  {
    id: 1,
    title: 'Подготовка к обновлению курсов',
    date: new Date(),
    text: 'Горные походы открывают удивительные природные ландшафты',
  },
  {
    id: 2,
    title: 'Поход в годы',
    date: new Date(),
    text: 'Думал, что очень много време...',
  },
  {
    id: 3,
    title: 'Первая заметка',
    date: new Date(),
    text: 'Создал первую заметку, чтобы ...',
  },
];

function App() {
  const [items, setItems] = useState(INITIAL_DATA);
  const addItem = (item) => {
    setItems((oldItems) => [
      ...oldItems,
      {
        id:
          oldItems.length > 0 ? Math.max(...oldItems.map((i) => i.id)) + 1 : 1,
        text: item.text,
        title: item.title,
        date: new Date(item.date),
      },
    ]);
  };

  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList items={items} />
      </LeftPanel>
      <Body>
        <JournalForm onSubmit={addItem} />
      </Body>
    </div>
  );
}

export default App;
