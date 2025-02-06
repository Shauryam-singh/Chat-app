import { useState } from "react";
import Chat from "./components/Chat";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState<any>(null);

  return <>{user ? <Chat /> : <Login setUser={setUser} />}</>;
}

export default App;
