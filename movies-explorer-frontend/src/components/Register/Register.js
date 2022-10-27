import {useEffect} from 'react';
// import { useNavigate } from 'react-router-dom';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import FieldForm from '../FieldForm/FieldForm.js';
import {useFormWithValidation} from '../formValidation.js';

function Register (props) {
  const { values, errors, isValid, isValidInputs, setIsValidInputs, handleChange, resetForm } = useFormWithValidation();

  useEffect(()=>{
    resetForm();
    setIsValidInputs({
      email: false,
      password: false,
      name: false,
    })
  }, [])

  function handleSubmit (e) {
    e.preventDefault();
    props.apiRegister(values.name, values.email, values.password);
  }

  return(
    <PopupWithForm  name="Register" title="Добро пожаловать!" text="Уже зарегистрированы?" auth="Auth"
      textButtonSave="Зарегистрироваться" textButtonOption="Войти" onClickPopupWithForm={props.onClickPopupWithForm}
      apiRegister={props.apiRegister}
      handleSubmit={handleSubmit}
      // onChange={handleChange}
      // values={values} errors={errors} 
      // isValidInputs={isValidInputs}
      isValid={isValid} 
      // buttonText={props.onTextButton}
      // isOpen = {props.isOpen}
      // onClose = {props.onClose}
      // onCloseOverlay = {props.onCloseOverlay}
      // onSubmit = {handleOnSubmit}
    >
      <FieldForm
        formType="Auth" heading="Имя"
        type="text" inputName="name" placeholder="Александр" 
        textError="поле ошибок валидации"
        isValidInputs={isValidInputs} values={values.name} onChange={handleChange} errors={errors.name}
      />
      <FieldForm
        formType="Auth" heading="E-mail"
        type="email" inputName="email" placeholder="pochta@yandex.ru"
        textError="поле ошибок валидации"
        isValidInputs={isValidInputs} values={values.email} onChange={handleChange} errors={errors.email}
      />
      <FieldForm
        formType="Auth" heading="Пароль"
        type="password" inputName="password" placeholder="••••••••••••••"
        textError="поле ошибок валидации"
        isValidInputs={isValidInputs} values={values.password} onChange={handleChange} errors={errors.password}
      />
    </PopupWithForm>
  )
}

export default Register