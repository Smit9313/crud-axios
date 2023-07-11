import { useData } from "../context/ContextProvider";
import styles from "./User.module.css";
import PropTypes from "prop-types";

const User = ({ id, img, name, email }) => {
  User.propTypes = {
    id: PropTypes.number,
    img: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  };

  const {handleDelete, handleEdit} = useData();

  return (
    <div className={styles.main}>
      <img src={img} alt={name} />
      <div className={styles.user__details}>
        <h5>{name}</h5>
        <p>{email}</p>
      </div>
      <div>
        <button onClick={() => handleEdit(id,name,email)}>
          <h3>Edit</h3>
        </button>
        <button onClick={() => handleDelete(id)}>
          <h3>Delete</h3>
        </button>
      </div>
    </div>
  );
};

export default User;
