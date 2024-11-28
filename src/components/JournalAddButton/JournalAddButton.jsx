import CardButton from '../CardButton/CardButton.jsx';
import './JournalAddButton.css';

function JournalAddButton() {
  return (
    <CardButton className="journal-add">
      <img src="/add-new-journal.svg" alt="Добавить новое воспоминание" />
      Новое воспоминание
    </CardButton>
  );
}

export default JournalAddButton;
