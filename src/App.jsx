import "./App.css";
import Form from "./components/Form";
import UserList from "./components/UserList";
import { ContextProvider } from "./context/ContextProvider";

function App() {
  return (
    <ContextProvider>
      <Form />
      <UserList />
    </ContextProvider>
  );
}

export default App;
