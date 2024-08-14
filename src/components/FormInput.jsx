import { Field, ErrorMessage } from "formik";

const FormInput = ({ icon, type, name, placeholder }) => (
  <div className="form-group">
    <div className="form-input">
      <span className="form-icon">{icon}</span>
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        className="form-control"
      />
    </div>
    <ErrorMessage name={name} component="span" className="error-message" />
  </div>
);

export default FormInput;
