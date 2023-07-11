import { useId } from "react";
import styles from "./Form.module.css";
import { useData } from "../context/ContextProvider";

const Form = () => {
  const id = useId();
  const {
    name,
    email,
    isEdit,
    handleAdd,
    handleUpdate,
    handleCancle,
    dispatch,
  } = useData();

  return (
    <div className={styles.form}>
      <center>
        <h1>{isEdit ? "Edit User" : "Add new user"}</h1>
      </center>
      <label htmlFor={`${id}--name`}>Name:</label>
      <input
        id={`${id}--name`}
        type="text"
        placeholder="name..."
        value={name}
        onChange={(e) => dispatch({ type: "name", payload: e.target.value })}
      />
      <br />
      {/* <br /> */}
      <label htmlFor={`${id}--email`}>Email:</label>
      <input
        id={`${id}--email`}
        type="email"
        placeholder="email..."
        value={email}
        onChange={(e) => dispatch({ type: "email", payload: e.target.value })}
      />
      <br />
      {isEdit ? (
        <div style={{ display: "flex" }}>
          <button onClick={handleCancle}>Cancle</button>
          &nbsp;&nbsp;
          <button type="submit" onClick={handleUpdate}>
            Update
          </button>
        </div>
      ) : (
        <button type="submit" onClick={() => handleAdd(name, email)}>
          Submit
        </button>
      )}
    </div>
  );
};

export default Form;
