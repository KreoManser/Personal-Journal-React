import { useState } from 'react';
import Button from '../Button/button';
import styles from './JournalForm.module.css';
import cn from 'classnames';

function JournalForm({ onSubmit }) {
  const [formValidState, setFormValidState] = useState({
    title: true,
    text: true,
    date: true,
  });
  const addJournalItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let isFormValid = true;
    if (
      !formProps.title?.trim() ||
      !formProps.text?.trim() ||
      !formProps.date
    ) {
      setFormValidState((state) => ({
        ...state,
        title: Boolean(formProps.title?.trim()),
        text: Boolean(formProps.text?.trim()),
        date: Boolean(formProps.date),
      }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({
        ...state,
        title: Boolean(formProps.title?.trim()),
        text: Boolean(formProps.text?.trim()),
        date: Boolean(formProps.date),
      }));
      isFormValid = true;
    }
    if (!isFormValid) {
      return;
    }
    onSubmit(formProps);
  };

  return (
    <>
      <form className={cn(styles['journal-form'])} onSubmit={addJournalItem}>
        <div>
          <input
            type="text"
            name="title"
            className={cn(styles['input-title'], {
              [styles['invalid']]: !formValidState.title,
            })}
          />
        </div>
        <div className={cn(styles['form-row'])}>
          <label htmlFor="date" className={cn(styles['form-label'])}>
            <img src="/calendar.svg" alt="Иконка календаря" />
            <span>Дата</span>
          </label>
          <input
            id="date"
            type="date"
            name="date"
            className={cn(styles['input'], {
              [styles['invalid']]: !formValidState.date,
            })}
          />
        </div>
        <div className={cn(styles['form-row'])}>
          <label htmlFor="tag" className={cn(styles['form-label'])}>
            <img src="/folder.svg" alt="Иконка календаря" />
            <span>Метки</span>
          </label>
          <input
            id="tag"
            type="text"
            name="tag"
            className={cn(styles['input'])}
          />
        </div>
        <div>
          <textarea
            name="text"
            id=""
            cols="30"
            rows="10"
            className={cn(styles['input'], {
              [styles['invalid']]: !formValidState.text,
            })}
          ></textarea>
        </div>
        <Button text="Сохранить" />
      </form>
    </>
  );
}

export default JournalForm;
