import './App.css';
import './components/Links';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Links from './components/Links';
import 'bootstrap';

function App() {
  return (
    <>
      <div className="container p-4">
        <div className="row">
          <Links/>
        </div>
        <ToastContainer/>
      </div>
    </>
  );
}

export default App;
