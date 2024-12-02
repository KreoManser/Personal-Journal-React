import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import { UserContext } from '../../context/user.context';
import { useContext } from 'react';

function JournalList({ items }) {
  const { userId } = useContext(UserContext);

  if (items.length === 0) {
    return <p>Записей пока нет, добавьте первую!</p>;
  }

  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  };

  return (
    <>
      {items
        .filter((el) => el.userId === userId)
        .sort(sortItems)
        .map((e) => (
          <CardButton key={e.id}>
            <JournalItem title={e.title} text={e.text} date={e.date} />
          </CardButton>
        ))}
    </>
  );
  return <div className="journal-list"> {list} </div>;
}

export default JournalList;
