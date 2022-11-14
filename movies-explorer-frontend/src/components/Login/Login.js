import {useEffect} from 'react';
import validator from 'validator';

import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import FieldForm from '../FieldForm/FieldForm.js';
import {useFormWithValidation} from '../formValidation.js';


function Login (props) {
  // const { values, errors, isValid, isValidInputs, setErrors, setIsValid, setIsValidInputs, handleChange, resetForm } = useFormWithValidation();

  useEffect(()=>{
    props.resetForm();
    props.setIsValidInputs({
      email: true,
      password: true,
      name: true,
    })
  }, [])

  useEffect(()=>{
    if (props.values.email) {
      if (!validator.isEmail(props.values.email)) {
        props.setIsValidInputs({email: false});
        props.setErrors({email: "неправильный формат почты"});
        props.setIsValid(false);
      }
    };
  },[props.values])

  function handleSubmit (e) {
    e.preventDefault();
    props.setIsValid(false);
    props.setIsDisabledInput(true);
    props.apiLogin(props.values.email, props.values.password);
  }

  return(
    <PopupWithForm  name="Login" title="Рады видеть!" text="Ещё не зарегистрированы?" auth="Auth"
      textButtonSave="Войти" textButtonOption="Регистрация" onClickPopupWithForm={props.onClickPopupWithForm}
      apiLogin={props.apiLogin}
      handleSubmit={handleSubmit}
      isValid={props.isValid} 
      values={props.values}
      isButtonSave={props.isButtonSave} changeButtonSave={props.changeButtonSave}
    >
      <FieldForm
        formType="Auth" heading="E-mail"
        inputName="email" placeholder="pochta@yandex.ru"
        textError="поле ошибок валидации"
        isValidInputs={props.isValidInputs} values={props.values.email} onChange={props.handleChange} errors={props.errors.email}
        isDisabledInput={props.isDisabledInput} 
      />
      <FieldForm
        formType="Auth" heading="Пароль"
        type="password" inputName="password" placeholder="••••••••••••••"
        textError="поле ошибок валидации"
        isValidInputs={props.isValidInputs} values={props.values.password} onChange={props.handleChange} errors={props.errors.password}
        isDisabledInput={props.isDisabledInput} 
      />
    </PopupWithForm>
  )
}

export default Login