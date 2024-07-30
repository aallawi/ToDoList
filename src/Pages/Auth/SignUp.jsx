import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import * as Yup from "yup";
import "./auth.css";
import { useEffect } from "react";
import { registerFun, cleanUserState } from "../../Redux/userSlice";

const SignUp = () => {
  const { thrRegister } = useSelector((state) => state.user);
  const { loading, success, error, errMessage } = thrRegister;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    name: Yup.string().min(4, "Too Short!").required("required"),
    userName: Yup.string().min(4, "Too Short!").required("required"),
    password: Yup.string().min(6, "Too Short!").required("required"),
  });

  useEffect(() => {
    if (success) {
      dispatch(cleanUserState());
      navigate("/");
    }
  }, [success, dispatch, navigate]);

  const onSubmit = async (values) => {
    await dispatch(registerFun(values));
  };

  return (
    <div className="background min-height">
      <Container>
        <div className="layer">
          <div className="auth">
            <div className="auth-content">
              <h3 className="auth-header">Create your account</h3>
              {error && <div>{errMessage}</div>}
              <Formik
                initialValues={{
                  userName: "",
                  password: "",
                }}
                onSubmit={onSubmit}
                validationSchema={schema}
              >
                <Form>
                  <div className="form-group">
                    <label htmlFor="name">Full Name:</label>
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Your Full Name"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="name"
                      component="span"
                      className="error-message"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="userName">Username:</label>
                    <Field
                      type="text"
                      name="userName"
                      id="userName"
                      placeholder="Username"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="userName"
                      component="span"
                      className="error-message"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="span"
                      className="error-message"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-submit">
                    Sign Up
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SignUp;
