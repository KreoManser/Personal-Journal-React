import { useEffect, useReducer } from 'react';
import Button from '../Button/button';
import styles from './JournalForm.module.css';
import cn from 'classnames';
import { formReducer, INITIAL_STATE } from './Journal.form';

function JournalForm({ onSubmit }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, values } = formState;

  useEffect(() => {
    let timerID;
    if (!isValid.date || !isValid.text || !isValid.title) {
      timerID = setTimeout(() => {
        dispatchForm({ type: 'RESET_VALIDATION' });
      }, 1000);
    }
    return () => {
      clearTimeout(timerID);
    };
  }, [isValid]);

  const onChange = (e) => {
    dispatchForm({
      type: 'SET_VALUE',
      payload: { [e.target.name]: e.target.value },
    });
  };

  const addJournalItem = (e) => {
    e.preventDefault();

    const titleValid = values.title.trim() !== '';
    const textValid = values.text.trim() !== '';
    const dateValid = values.date.trim() !== '';

    const canSubmit = titleValid && textValid && dateValid;
    dispatchForm({ type: 'SUBMIT' });

    if (canSubmit) {
      onSubmit(values);
      dispatchForm({ type: 'CLEAR' });
    }
  };

  return (
    <>
      <form className={cn(styles['journal-form'])} onSubmit={addJournalItem}>
        <div>
          <input
            type="text"
            value={values.title}
            onChange={onChange}
            name="title"
            className={cn(styles['input-title'], {
              [styles['invalid']]: !isValid.title,
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
            value={values.date}
            onChange={onChange}
            name="date"
            className={cn(styles['input'], {
              [styles['invalid']]: !isValid.date,
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
            value={values.tag}
            onChange={onChange}
            name="tag"
            className={cn(styles['input'])}
          />
        </div>
        <div>
          <textarea
            name="text"
            value={values.text}
            onChange={onChange}
            id=""
            cols="30"
            rows="10"
            className={cn(styles['input'], {
              [styles['invalid']]: !isValid.text,
            })}
          ></textarea>
        </div>
        <Button text="Сохранить" />
      </form>
    </>
  );
}

export default JournalForm;
