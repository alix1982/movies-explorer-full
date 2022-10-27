function FieldForm (props) {
  // console.log(props.errors);
  // console.log(props.inputName);

  return(
    <fieldset className={`form__fieldInput form${props.formType}__fieldInput`}>
      <h3 className={`form__inputHeading form${props.formType}__inputHeading`}>{props.heading}</h3>
      <input className={`form__input form${props.formType}__input`}
        type={props.type} name={props.inputName} placeholder={props.placeholder}
        minLength="2" maxLength="30"
        value={props.values} onChange={props.onChange}
      />
      <span className={`form__message-error form${props.formType}__message-error`}>{props.errors}</span>
    </fieldset>
  )
}

export default FieldForm