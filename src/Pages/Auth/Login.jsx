import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import "./auth.css";
import { loginFun, cleanUserState } from "../../Redux/userSlice";

const Login = () => {
  const { theLogin } = useSelector((state) => state.user);
  const { loading, success, error, errMessage } = theLogin;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    userName: Yup.string().min(4, "Too Short!").required("Required"),
    password: Yup.string().min(6, "Too Short!").required("Required"),
  });

  useEffect(() => {
    if (success) {
      // dispatch(cleanUserState());
      navigate("/", { replace: true });
    }
  }, [success, dispatch, navigate]);

  const onSubmit = async (values) => {
    await dispatch(loginFun(values));
  };

  return (
    <div className="background min-height">
      <Container>
        <div className="layer">
          <div className="auth">
            <div className="auth-content">
              <h3 className="auth-header">Login to your account</h3>
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
                    Login
                    {loading && <p>Loading...</p>}
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

export default Login;
