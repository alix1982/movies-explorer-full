import {useEffect, useContext} from 'react';
import validator from 'validator';

import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import FieldForm from '../FieldForm/FieldForm.js';
import {useFormWithValidation} from '../formValidation.js';
import {CurrentUserContext, currentUserContext} from '../../contexts/CurrentUserContext.js';

function Profile (props) {
  const userContext = useContext(CurrentUserContext);
  const { values, errors, isValid, isValidInputs, setValues, setErrors, setIsValid, setIsValidInputs, handleChange, resetForm } = useFormWithValidation();
  // const regex = "([_A-Za-z0-9-+]{1,})@([_A-Za-z0-9-+]{1,})(.)([_A-Za-z0-9-+]{2,3})";
  // console.log(values)
  // if (values.email) {console.log(validator.isEmail(values.email))};
  useEffect(()=>{
    if (userContext.email === values.email && userContext.name === values.name) {
      setIsValid(false);
    }
  },[values])

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

  useEffect(()=>{
    if (values.email) {
      if (!validator.isEmail(values.email)) {
        setIsValidInputs({email: false});
        setErrors({email: "неправильный формат почты"});
        setIsValid(false);
      }
    };
  },[values])
  // console.log(isValid);

  function handleSubmit (e) {
    e.preventDefault();
    props.setIsDisabledInput(true);
    props.updateUser(values);
  }

  return(
    <PopupWithForm  name="Profile" title={`Привет, ${userContext.name}!`}
      textButtonSave="Редактировать" textButtonOption="Выйти из аккаунта" onClickPopupWithForm={props.onClickPopupWithForm}
      isValid={isValid}
      handleSubmit={handleSubmit}
      values={values}
      isButtonSave={props.isButtonSave} changeButtonSave={props.changeButtonSave}
    >
      <FieldForm
        formType="Profile" heading="Имя"
        type="text" inputName="name" placeholder="Александр" 
        values={values.name} onChange={handleChange} errors={errors.name}
        isDisabledInput={props.isDisabledInput} 
      />
      <div className="formProfile__line"></div>
      <FieldForm
        formType="Profile" heading="E-mail"
        type="email" 
        inputName="email" placeholder="pochta@yandex.ru"
        values={values.email} onChange={handleChange} errors={errors.email}
        isDisabledInput={props.isDisabledInput} 
      />
    </PopupWithForm>
  )
}

export default Profile