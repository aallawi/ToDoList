import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetUserState, loginFun, registerFun } from "../../Redux/userSlice";
import { resetTaskState } from "../../Redux/taskSlice";
import { CiUser, CiAt } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import FormInput from "../../components/FormInput";
import * as Yup from "yup";
import "./auth.css";

const Auth = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleSignup = () => setIsChecked(true);
  const handleLogin = () => setIsChecked(false);

  const { theLogin, thrRegister } = useSelector((state) => state.user);
  const {
    loginLoading = theLogin.loading,
    loginSuccess = theLogin.success,
    loginError = theLogin.error,
    loginErrMessage = theLogin.errMessage,
  } = theLogin;

  const {
    registerLoading = thrRegister.loading,
    registerSuccess = thrRegister.success,
    registerError = thrRegister.error,
    registerErrMessage = thrRegister.errMessage,
  } = thrRegister;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schemaRegister = Yup.object().shape({
    name: Yup.string().min(4, "Too Short!").required("required"),
    userName: Yup.string().min(4, "Too Short!").required("required"),
    password: Yup.string().min(6, "Too Short!").required("required"),
  });

  const schemaLogin = Yup.object().shape({
    userNameLogin: Yup.string().min(4, "Too Short!").required("Required"),
    passwordLogin: Yup.string().min(6, "Too Short!").required("Required"),
  });

  useEffect(() => {
    if (registerSuccess || loginSuccess) {
      dispatch(resetUserState());
      dispatch(resetTaskState());
      navigate("/tasks");
    }
  }, [registerSuccess, loginSuccess, navigate, dispatch]);

  const onSubmitLogin = async (values) => {
    const lowercasedValues = {
      userNameLogin: values.userNameLogin.toLowerCase(),
      passwordLogin: values.passwordLogin,
    };
    console.log(lowercasedValues);
    await dispatch(loginFun(lowercasedValues));
  };

  const onSubmitRegister = async (values) => {
    const lowercasedValues = {
      name: values.name,
      userName: values.userName.toLowerCase(),
      password: values.password,
    };
    console.log(lowercasedValues);
    await dispatch(registerFun(lowercasedValues));
  };

  return (
    <div className="auth">
      <div className="relative">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 align-self-center">
              <div className="relative">
                <h6 className="switch_title">
                  <span
                    onClick={handleLogin}
                    className={isChecked ? "" : "active"}
                  >
                    Log In
                  </span>
                  <span
                    onClick={handleSignup}
                    className={isChecked ? "active" : ""}
                  >
                    Sign Up
                  </span>
                </h6>
                <input
                  className="checkbox"
                  type="checkbox"
                  id="switch_button"
                  name="switch_button"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
                <label htmlFor="switch_button"></label>

                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    {/* Login */}
                    <div className="card-front box">
                      <div className="center-wrap">
                        <div className="section">
                          <h4 className="title">Log In</h4>
                          <div className="error">
                            {loginError && loginErrMessage}
                          </div>
                          <Formik
                            initialValues={{
                              userNameLogin: "allawi",
                              passwordLogin: "123456789",
                            }}
                            onSubmit={onSubmitLogin}
                            validationSchema={schemaLogin}
                          >
                            <Form>
                              <FormInput
                                icon={<CiAt size={20} className="icon" />}
                                type="text"
                                name="userNameLogin"
                                placeholder="Username"
                              />

                              <FormInput
                                icon={
                                  <RiLockPasswordLine
                                    size={20}
                                    className="icon"
                                  />
                                }
                                type="password"
                                name="passwordLogin"
                                placeholder="Password"
                              />

                              <button type="submit" className="btn">
                                {loginLoading ? (
                                  <AiOutlineLoading3Quarters
                                    size={20}
                                    className="spins"
                                    color="white"
                                  />
                                ) : (
                                  "Login"
                                )}
                              </button>
                            </Form>
                          </Formik>

                          <p className="prompt">
                            Don’t have an account?{" "}
                            <span onClick={handleSignup} className="link">
                              Sign up
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Sign Up */}
                    <div className="card-back box">
                      <div className="center-wrap">
                        <div className="section">
                          <h4 className="title">Sign Up</h4>
                          <div className="error">
                            {registerError && registerErrMessage}
                          </div>
                          <Formik
                            initialValues={{
                              name: "",
                              userName: "",
                              password: "",
                            }}
                            onSubmit={onSubmitRegister}
                            validationSchema={schemaRegister}
                          >
                            <Form>
                              <FormInput
                                icon={<CiUser size={20} className="icon" />}
                                type="text"
                                name="name"
                                placeholder="Your Full Name"
                              />

                              <FormInput
                                icon={<CiAt size={20} className="icon" />}
                                type="text"
                                name="userName"
                                placeholder="Username"
                              />

                              <FormInput
                                icon={
                                  <RiLockPasswordLine
                                    size={20}
                                    className="icon"
                                  />
                                }
                                type="password"
                                name="password"
                                placeholder="Password"
                              />

                              <button type="submit" className="btn">
                                {registerLoading ? (
                                  <AiOutlineLoading3Quarters
                                    size={20}
                                    className="spins"
                                    color="white"
                                  />
                                ) : (
                                  "Sign Up"
                                )}
                              </button>
                            </Form>
                          </Formik>

                          <p className="prompt">
                            Already have an account?{" "}
                            <span onClick={handleLogin}>Login</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
