import validator from 'validator';

validator.isEmail('foo@bar.com ');

function FieldForm (props) {

  return(
    <fieldset className={`form__fieldInput form${props.formType}__fieldInput`}>
      <h3 className={`form__inputHeading form${props.formType}__inputHeading`}>{props.heading}</h3>
      <input className={`form__input form${props.formType}__input`}
        type={props.type} name={props.inputName} placeholder={props.placeholder}
        minLength="2" maxLength="30" required
        value={props.values} onChange={props.onChange}
        disabled={props.isDisabledInput}
      />
      <span className={`form__message-error form${props.formType}__message-error`}>{props.errors}</span>
    </fieldset>
  )
}

export default FieldForm