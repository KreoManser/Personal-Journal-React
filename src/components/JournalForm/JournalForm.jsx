import Button from '../Button/button';
import './JournalForm.css';
import { useState } from 'react';

function JournalForm() {
  const [inputData, setInputData] = useState('');

  const inputChange = (event) => {
    setInputData(event.target.value);
    console.log(inputData);
  };

  const addJournalItem = (e) => {
    const formData = new FormData(e.target);
    const fromProps = Object.fromEntries(formData);
    e.preventDefault();
    console.log(fromProps);
  };

  return (
    <>
      <form className="journal-form" onSubmit={addJournalItem}>
        <input type="text" name="title" />
        <input type="date" name="date" />
        <input
          type="text"
          name="tag"
          value={inputData}
          onChange={inputChange}
        />
        <textarea name="post" id="" cols="30" rows="10"></textarea>
        <Button
          text="Сохранить"
          onClick={() => {
            console.log('Нажали');
          }}
        />
      </form>
    </>
  );
}

export default JournalForm;
