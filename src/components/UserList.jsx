import User from "./User";
import { useData } from "../context/ContextProvider";

const UserList = () => {

  const {users} = useData();

  return (
    <div>
      {users.map((val) => (
        <User
          key={val.id}
          id={val.id}
          img={val.avatar}
          name={val.name}
          email={val.email}
        />
      ))}
    </div>
  );
};

export default UserList;
