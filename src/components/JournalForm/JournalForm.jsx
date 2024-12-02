import { useEffect, useReducer, useRef } from 'react';
import Button from '../Button/button';
import Input from '../Input/input';
import styles from './JournalForm.module.css';
import cn from 'classnames';
import { formReducer, INITIAL_STATE } from './Journal.form';
import { UserContext } from '../../context/user.context';
import { useContext } from 'react';

function JournalForm({ onSubmit }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, values } = formState;
  const titleRef = useRef();
  const textRef = useRef();
  const dateRef = useRef();
  const { userId } = useContext(UserContext);

  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.text:
        textRef.current.focus();
        break;
    }
  };

  useEffect(() => {
    let timerID;
    if (!isValid.date || !isValid.text || !isValid.title) {
      focusError(isValid);
      timerID = setTimeout(() => {
        dispatchForm({ type: 'RESET_VALIDATION' });
      }, 1000);
    }
    return () => {
      clearTimeout(timerID);
    };
  }, [isValid]);

  useEffect(() => {
    dispatchForm({
      type: 'SET_VALUE',
      payload: { userId },
    });
  }, [userId]);

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
    <form className={cn(styles['journal-form'])} onSubmit={addJournalItem}>
      <div>
        <Input
          type="text"
          isValid={isValid.title}
          ref={titleRef}
          value={values.title}
          onChange={onChange}
          name="title"
          appearence="title"
        />
      </div>
      <div className={cn(styles['form-row'])}>
        <label htmlFor="date" className={cn(styles['form-label'])}>
          <img src="/calendar.svg" alt="Иконка календаря" />
          <span>Дата</span>
        </label>
        <Input
          id="date"
          type="date"
          isValid={isValid.date}
          ref={dateRef}
          value={values.date}
          onChange={onChange}
          name="date"
        />
      </div>
      <div className={cn(styles['form-row'])}>
        <label htmlFor="tag" className={cn(styles['form-label'])}>
          <img src="/folder.svg" alt="Иконка календаря" />
          <span>Метки</span>
        </label>
        <Input
          id="tag"
          type="text"
          value={values.tag}
          onChange={onChange}
          name="tag"
        />
      </div>
      <div>
        <textarea
          name="text"
          ref={textRef}
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
      <Button>Сохранить</Button>
    </form>
  );
}

export default JournalForm;
