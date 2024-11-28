import './App.css';
import Button from './components/Button/button';
import Header from './components/Header/Header';
import Body from './layout/Body/Body';
import CardButton from './components/CardButton/CardButton';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalItem from './components/JournalItem/JournalItem';
import LeftPanel from './layout/LeftPanel/LeftPanel';
import JournalList from './components/JournalList/JournalList';
import JournalForm from './components/JournalForm/JournalForm';

function App() {
  const data = [
    {
      title: 'Подготовка к обновлению курсов',
      date: new Date(),
      text: 'Горные походы открывают удивительные природные ландшафты',
    },
    {
      title: 'Поход в годы',
      date: new Date(),
      text: 'Думал, что очень много време...',
    },
    {
      title: 'Первая заметка',
      date: new Date(),
      text: 'Создал первую заметку, чтобы ...',
    },
  ];

  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList>
          <CardButton>
            <JournalItem
              title={data[0].title}
              text={data[0].text}
              date={data[0].date}
            />
          </CardButton>
          <CardButton>
            <JournalItem
              title={data[1].title}
              text={data[1].text}
              date={data[1].date}
            />
          </CardButton>
          <CardButton>
            <JournalItem
              title={data[2].title}
              text={data[2].text}
              date={data[2].date}
            />
          </CardButton>
        </JournalList>
      </LeftPanel>
      <Body>
        <JournalForm />
      </Body>
    </div>
  );
}

export default App;
