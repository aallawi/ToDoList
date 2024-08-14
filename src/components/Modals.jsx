import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { CiCalendarDate } from "react-icons/ci";
import { TfiLayoutListThumbAlt } from "react-icons/tfi";
import { MdOutlineDescription, MdOutlineFolderSpecial } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { resetTaskState, createTask, updateTask } from "../Redux/taskSlice";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";

const Modals = ({ show, setShow, task }) => {
  const [mode, setMode] = useState("Create");

  useEffect(() => {
    setMode(task ? "Update" : "Create");
  }, [task]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userData } = useSelector((state) => state.user);
  const { theCreate, theUpdate } = useSelector((state) => state.task);
  const {
    createLoading = theCreate.loading,
    createSuccess = theCreate.success,
    createError = theCreate.error,
    createErrMessage = theCreate.errMessage,
  } = theCreate;

  const {
    updateLoading = theUpdate.loading,
    updateSuccess = theUpdate.success,
    updateError = theUpdate.error,
    updateErrMessage = theUpdate.errMessage,
  } = theUpdate;

  const taskSchema = Yup.object().shape({
    name: Yup.string().min(4, "Too Short!").required("Required"),
    description: Yup.string().min(10, "Too Short!").required("Required"),
    type: Yup.string().required("Please select a category"),
    date: Yup.date(),
  });

  const onSubmit = async (values) => {
    const taskData = { ...values, complete: false, archive: false };

    if (mode === "Create") {
      await dispatch(createTask({ userId: userData.id, taskData }));
    } else {
      await dispatch(
        updateTask({ userId: userData.id, taskId: task?.id, taskData })
      );
    }
  };

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      dispatch(resetTaskState());
      setShow(false);
      navigate("/");
    }
  }, [createSuccess, updateSuccess]);

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          {mode} Your Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: task?.name || "",
            description: task?.description || "",
            type: task?.type || "",
            date: task?.date || "",
          }}
          validationSchema={taskSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="form-group">
              <div className="form-input">
                <span className="form-icon">
                  <TfiLayoutListThumbAlt size={20} className="icon" />
                </span>
                <Field
                  type="text"
                  name="name"
                  placeholder="Task name"
                  className="form-control"
                />
              </div>
              <ErrorMessage
                name="name"
                component="span"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <div className="form-input">
                <span className="form-icon">
                  <MdOutlineDescription size={20} className="icon" />
                </span>
                <Field
                  type="text"
                  name="description"
                  placeholder="Task description"
                  className="form-control"
                />
              </div>
              <ErrorMessage
                name="description"
                component="span"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <div className="form-input">
                <span className="form-icon">
                  <MdOutlineFolderSpecial size={20} className="icon" />
                </span>
                <Field as="select" name="type" className="form-control">
                  <option value="" label="Select type" />
                  <option value="Personal" label="Personal" />
                  <option value="Work" label="Work" />
                </Field>
              </div>
              <ErrorMessage
                name="type"
                component="span"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <div className="form-input">
                <span className="form-icon">
                  <CiCalendarDate size={20} className="icon" />
                </span>
                <Field
                  type="date"
                  name="date"
                  placeholder="Task date"
                  className="form-control"
                />
              </div>
              <ErrorMessage
                name="date"
                component="span"
                className="error-message"
              />
            </div>

            <button className="btn" type="submit">
              {createLoading || updateLoading ? (
                <AiOutlineLoading3Quarters
                  size={20}
                  className="spins"
                  color="white"
                />
              ) : (
                `${mode} Task`
              )}
            </button>
          </Form>
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default Modals;
