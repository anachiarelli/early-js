import './App.css';
import Formulario from './early/Formulario';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-primary">&nbsp;</nav>
      <div className="container">
        <h1 className="my-3 pb-3 border-bottom">Early Parser</h1>
        <div className="row">
          <div className="col col-lg-6">
            <Formulario />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
