import {useEffect} from 'react';
import validator from 'validator';

import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import FieldForm from '../FieldForm/FieldForm.js';
import {useFormWithValidation} from '../formValidation.js';

function Register (props) {
  // const { values, errors, isValid, isValidInputs, setErrors, setIsValid, setIsValidInputs, handleChange, resetForm } = useFormWithValidation();

  useEffect(()=>{
    props.resetForm();
    props.setIsValidInputs({
      name: false,
      email: false,
      password: false,
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
    props.apiRegister(props.values.name, props.values.email, props.values.password);
  }

  return(
    <PopupWithForm  name="Register" title="Добро пожаловать!" text="Уже зарегистрированы?" auth="Auth"
      textButtonSave="Зарегистрироваться" textButtonOption="Войти" onClickPopupWithForm={props.onClickPopupWithForm}
      apiRegister={props.apiRegister}
      handleSubmit={handleSubmit}
      values={props.values}
      isButtonSave={props.isButtonSave} changeButtonSave={props.changeButtonSave}
      isValid={props.isValid} 
    >
      <FieldForm
        formType="Auth" heading="Имя"
        type="text" inputName="name" placeholder="Александр" 
        textError="поле ошибок валидации"
        isValidInputs={props.isValidInputs} values={props.values.name} onChange={props.handleChange} errors={props.errors.name}
        isDisabledInput={props.isDisabledInput} 
      />
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

export default Register