
import './App.css';
import "pepsico-ds/css";
import {Button, Header} from "pepsico-ds";
import {DatePickerInput} from "pepsico-ds";
import HeaderSignIn from './components/HeaderSignIn';
import BasicForm from './components/BasicForm';
import {Icon} from "pepsico-ds";

function App() {
  return (
    <div className= 'container'>
      <HeaderSignIn/>
    <div className='PepForm'>
    <BasicForm/>

    </div>
    </div>
    
  );
}

export default App;
