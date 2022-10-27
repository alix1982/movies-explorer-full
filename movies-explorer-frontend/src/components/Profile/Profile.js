import {useEffect, useContext} from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import FieldForm from '../FieldForm/FieldForm.js';
import {useFormWithValidation} from '../formValidation.js';
import {CurrentUserContext, currentUserContext} from '../../contexts/CurrentUserContext.js';

function Profile (props) {
  const userContext = useContext(CurrentUserContext);
  const { values, errors, isValid, isValidInputs, setValues, setIsValidInputs, handleChange, resetForm } = useFormWithValidation();

  useEffect(()=>{
    resetForm();
    setIsValidInputs({
      email: true,
      name: true,
    })
    setValues({
      email: userContext.email,
      name: userContext.name,
    })
  }, [])
  
  function handleSubmit (e) {
    e.preventDefault();
    props.updateUser(values);
  }

  return(
    <PopupWithForm  name="Profile" title={`Привет, ${userContext.name}!`}
      textButtonSave="Редактировать" textButtonOption="Выйти из аккаунта" onClickPopupWithForm={props.onClickPopupWithForm}
      isValid={isValid}
      handleSubmit={handleSubmit}

      // buttonText={props.onTextButton}
      // isOpen = {props.isOpen}
      // onClose = {props.onClose}
      // onCloseOverlay = {props.onCloseOverlay}
      // handleOnClick={props.handleOnClick}
    >
      <FieldForm
        formType="Profile" heading="Имя"
        type="text" inputName="name" placeholder="Александр" 
        textError="поле ошибок валидации"
        isValidInputs={isValidInputs} values={values.name} onChange={handleChange} errors={errors.name}
      />
      <div className="formProfile__line"></div>
      <FieldForm
        formType="Profile" heading="E-mail"
        type="email" inputName="email" placeholder="pochta@yandex.ru"
        textError="поле ошибок валидации"
        isValidInputs={isValidInputs} values={values.email} onChange={handleChange} errors={errors.email}
      />
    </PopupWithForm>
  )
}

export default Profile