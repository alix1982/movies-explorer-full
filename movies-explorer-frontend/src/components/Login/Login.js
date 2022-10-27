import {useEffect} from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import FieldForm from '../FieldForm/FieldForm.js';
import {useFormWithValidation} from '../formValidation.js';


function Login (props) {
  const { values, errors, isValid, isValidInputs, setIsValidInputs, handleChange, resetForm } = useFormWithValidation();

  useEffect(()=>{
    resetForm();
    setIsValidInputs({
      email: true,
      password: true,
      name: true,
    })
  }, [])

  function handleSubmit (e) {
    e.preventDefault();
    props.apiLogin(values.email, values.password);
  }

  return(
    <PopupWithForm  name="Login" title="Рады видеть!" text="Ещё не зарегистрированы?" auth="Auth"
      textButtonSave="Войти" textButtonOption="Регистрация" onClickPopupWithForm={props.onClickPopupWithForm}
      apiLogin={props.apiLogin}
      handleSubmit={handleSubmit}
      isValid={isValid} 
      // buttonText={props.onTextButton}
      // isOpen = {props.isOpen}
      // onClose = {props.onClose}
      // onCloseOverlay = {props.onCloseOverlay}
      // onSubmit = {handleOnSubmit}
    >
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

export default Login