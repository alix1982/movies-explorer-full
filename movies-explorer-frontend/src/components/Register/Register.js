import {useEffect} from 'react';
import validator from 'validator';

import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import FieldForm from '../FieldForm/FieldForm.js';
import {useFormWithValidation} from '../formValidation.js';

function Register (props) {
  const { values, errors, isValid, isValidInputs, setErrors, setIsValid, setIsValidInputs, handleChange, resetForm } = useFormWithValidation();

  useEffect(()=>{
    resetForm();
    setIsValidInputs({
      name: false,
      email: false,
      password: false,
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
    props.apiRegister(values.name, values.email, values.password);
  }

  return(
    <PopupWithForm  name="Register" title="Добро пожаловать!" text="Уже зарегистрированы?" auth="Auth"
      textButtonSave="Зарегистрироваться" textButtonOption="Войти" onClickPopupWithForm={props.onClickPopupWithForm}
      apiRegister={props.apiRegister}
      handleSubmit={handleSubmit}
      values={values}
      isButtonSave={props.isButtonSave} changeButtonSave={props.changeButtonSave}
      isValid={isValid} 
    >
      <FieldForm
        formType="Auth" heading="Имя"
        type="text" inputName="name" placeholder="Александр" 
        textError="поле ошибок валидации"
        isValidInputs={isValidInputs} values={values.name} onChange={handleChange} errors={errors.name}
        isDisabledInput={props.isDisabledInput} 
      />
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

export default Register