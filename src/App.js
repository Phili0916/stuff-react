import './styles/login.scss'
import Login_logic from "./component/login_logic";
import Login_display from "./component/login_display";


function App() {
  return (
    <div className="App">
      <Login_logic />
      <Login_display />
    </div>
  );
}

export default App;
