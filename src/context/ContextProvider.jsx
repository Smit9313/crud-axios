import { createContext, useReducer, useContext, useEffect } from "react";
import axios from "axios";

const Context = createContext();

const initialValue = {
  users: [],
  name: "",
  email: "",
  isEdit: false,
  tmpId: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "users":
      return { ...state, users: action.payload };
    case "name":
      return { ...state, name: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "click_edit":
      return {
        ...state,
        name: action.name,
        email: action.email,
        isEdit: true,
        tmpId: action.tmpId,
      };
    case "click_cancle":
      return { ...state, name: "", email: "", isEdit: false, tmpId: "" };
    case "clear_form":
      return { ...state, name: "", email: "", tmpId: "", isEdit: false };
    default:
      throw new Error("Unknown action type...");
  }
};

// eslint-disable-next-line react/prop-types
const ContextProvider = ({ children }) => {
  const [{ name, email, isEdit, users, tmpId }, dispatch] = useReducer(
    reducer,
    initialValue
  );
  //   const [user, setUser] = useState([]);
  const fetchData = async () => {
    const data = await axios("http://localhost:3000/data");
    // console.log(data);
    if (data.data) dispatch({ type: "users", payload: data.data });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (name, email) => {
    if (!name || !email) return;
    const id = Math.random();
    const data = {
      id: id,
      name: name,
      email: email,
      avatar: `https://i.pravatar.cc/48?u=${id}`,
    };
    const res = await axios.post("http://localhost:3000/data", data);
    if (res.statusText === "Created") {
      dispatch({ type: "clear_form" });
      fetchData();
    }
  };

  const handleDelete = async (id) => {
    // console.log(id);
    const confirmed = window.confirm("Are you sure you want to delete record?");
    if (confirmed) {
      const res = await axios.delete(`http://localhost:3000/data/${id}`);
      // console.log(res);

      if (res.statusText === "OK") {
        fetchData();
        dispatch({ type: "clear_form" });
      }
    }
  };

  const handleEdit = async (id, name, email) => {
    // console.log(id, name, email);
    dispatch({ type: "click_edit", name: name, email: email, tmpId: id });
  };

  const handleUpdate = async () => {
    if (!name || !email || !tmpId) return;

    const data = {
      id: tmpId,
      name: name,
      email: email,
      avatar: `https://i.pravatar.cc/48?u=${tmpId}`,
    };
    const res = await axios.patch(`http://localhost:3000/data/${tmpId}`, data);
    // console.log(res);
    if (res.statusText === "OK") {
      fetchData();
      dispatch({ type: "clear_form" });
    }
  };

  const handleCancle = (e) => {
    e.preventDefault();
    dispatch({ type: "click_cancle" });
  };

  return (
    <Context.Provider
      value={{
        name,
        email,
        isEdit,
        users,
        handleAdd,
        handleDelete,
        handleEdit,
        handleUpdate,
        handleCancle,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useData = () => {
  const context = useContext(Context);
  return context;
};

export { ContextProvider, useData };
