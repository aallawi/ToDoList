import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CiCalendarDate } from "react-icons/ci";
import { TfiLayoutListThumbAlt } from "react-icons/tfi";
import { MdOutlineDescription, MdOutlineFolderSpecial } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { createTask, updateTask } from "../Redux/taskSlice";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";

const taskSchema = Yup.object().shape({
  name: Yup.string().min(4, "Too Short!").required("Required"),
  description: Yup.string().min(10, "Too Short!").required("Required"),
  type: Yup.string().required("Please select a category"),
  date: Yup.date(),
});

const Modals = ({ show, setShow, task }) => {
  const [mode, setMode] = useState("Create");
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    setMode(task ? "Update" : "Create");
  }, [task]);

  const onSubmit = async (values) => {
    const taskData = { ...values, complete: false, archive: false };

    if (mode === "Create") {
      await dispatch(createTask({ userId: userData.id, taskData }));
    } else {
      await dispatch(
        updateTask({ userId: userData.id, taskId: task?.id, taskData })
      );
    }

    setShow(false);
  };

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
                  <option value="personal" label="Personal" />
                  <option value="work" label="Work" />
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
              {mode} Task
            </button>
          </Form>
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default Modals;
