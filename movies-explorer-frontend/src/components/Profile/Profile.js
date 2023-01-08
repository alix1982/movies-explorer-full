import {useEffect, useContext} from 'react';
import validator from 'validator';

import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import FieldForm from '../FieldForm/FieldForm.js';
import {CurrentUserContext, currentUserContext} from '../../contexts/CurrentUserContext.js';

function Profile (props) {
  const userContext = useContext(CurrentUserContext);
  // const regex = "([_A-Za-z0-9-+]{1,})@([_A-Za-z0-9-+]{1,})(.)([_A-Za-z0-9-+]{2,3})";
  // if (values.email) {console.log(validator.isEmail(values.email))};
  useEffect(()=>{
    if (userContext.email === props.values.email && userContext.name === props.values.name) {
      props.setIsValid(false);
    }
  },[props.values])

  useEffect(()=>{
    props.resetForm();
    props.setIsValidInputs({
      email: true,
      name: true,
    })
    props.setValues({
      email: userContext.email,
      name: userContext.name,
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
  // console.log(isValid);

  function handleSubmit (e) {
    e.preventDefault();
    props.setIsValid(false);
    props.setIsDisabledInput(true);
    props.updateUser(props.values);
  }

  return(
    <PopupWithForm  name="Profile" title={`Привет, ${userContext.name}!`}
      textButtonSave="Редактировать" textButtonOption="Выйти из аккаунта" onClickPopupWithForm={props.onClickPopupWithForm}
      isValid={props.isValid}
      handleSubmit={handleSubmit}
      values={props.values}
      isButtonSave={props.isButtonSave} changeButtonSave={props.changeButtonSave}
    >
      <FieldForm
        formType="Profile" heading="Имя"
        type="text" inputName="name" placeholder="Александр" 
        values={props.values.name} onChange={props.handleChange} errors={props.errors.name}
        isDisabledInput={props.isDisabledInput} 
      />
      <div className="formProfile__line"></div>
      <FieldForm
        formType="Profile" heading="E-mail"
        type="email" 
        inputName="email" placeholder="pochta@yandex.ru"
        values={props.values.email} onChange={props.handleChange} errors={props.errors.email}
        isDisabledInput={props.isDisabledInput} 
      />
    </PopupWithForm>
  )
}

export default Profile