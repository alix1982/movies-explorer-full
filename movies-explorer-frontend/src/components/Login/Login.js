import {useEffect} from 'react';
import validator from 'validator';

import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import FieldForm from '../FieldForm/FieldForm.js';
import {useFormWithValidation} from '../formValidation.js';


function Login (props) {
  const { values, errors, isValid, isValidInputs, setErrors, setIsValid, setIsValidInputs, handleChange, resetForm } = useFormWithValidation();

  useEffect(()=>{
    resetForm();
    setIsValidInputs({
      email: true,
      password: true,
      name: true,
    })
  }, [])

  useEffect(()=>{
    if (values.email) {
      if (!validator.isEmail(values.email)) {
        setIsValidInputs({email: false});
        setErrors({email: "неправильный формат почты"});
        setIsValid(false);
      }
    };
  },[values])

  function handleSubmit (e) {
    e.preventDefault();
    props.setIsDisabledInput(true);
    props.apiLogin(values.email, values.password);
  }

  return(
    <PopupWithForm  name="Login" title="Рады видеть!" text="Ещё не зарегистрированы?" auth="Auth"
      textButtonSave="Войти" textButtonOption="Регистрация" onClickPopupWithForm={props.onClickPopupWithForm}
      apiLogin={props.apiLogin}
      handleSubmit={handleSubmit}
      isValid={isValid} 
      values={values}
      isButtonSave={props.isButtonSave} changeButtonSave={props.changeButtonSave}
    >
      <FieldForm
        formType="Auth" heading="E-mail"
        inputName="email" placeholder="pochta@yandex.ru"
        textError="поле ошибок валидации"
        isValidInputs={isValidInputs} values={values.email} onChange={handleChange} errors={errors.email}
        isDisabledInput={props.isDisabledInput} 
      />
      <FieldForm
        formType="Auth" heading="Пароль"
        type="password" inputName="password" placeholder="••••••••••••••"
        textError="поле ошибок валидации"
        isValidInputs={isValidInputs} values={values.password} onChange={handleChange} errors={errors.password}
        isDisabledInput={props.isDisabledInput} 
      />
    </PopupWithForm>
  )
}

export default Login