import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import { UserContext } from '../../context/user.context';
import { useContext, useMemo } from 'react';

function JournalList({ items, setItem }) {
  const { userId } = useContext(UserContext);

  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  };

  const filteredItems = useMemo(
    () => items.filter((el) => el.userId === userId).sort(sortItems),
    [items, userId]
  );

  if (items.length === 0) {
    return <p>Записей пока нет, добавьте первую!</p>;
  }

  return (
    <>
      {filteredItems.map((e) => (
        <CardButton key={e.id} onClick={() => setItem(e)}>
          <JournalItem title={e.title} text={e.text} date={e.date} />
        </CardButton>
      ))}
    </>
  );
}

export default JournalList;
