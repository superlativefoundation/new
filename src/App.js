import logo from './logo.svg';
import './App.css';
import Devices from './Devices';
import Messages from './Messages';
import Cards from './Cards';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';


function App() {
  const [deviceId, setDeviceId] = useState(null);
  const [deviceNo, setDeviceNo] = useState(null);
  const [deviceName, setDeviceName] = useState(null)
  function getDeviceId(id) {

    setDeviceId(id);
  }
  function getDeviceName(name) {

    setDeviceName(name);
  }
  function getDeviceNo(no) {

    setDeviceNo(no);
  }
  return (
    <div className="App">
      <div className='header'><h1 data-mdb-toggle="animation" data-mdb-animation-reset="true" data-mdb-animation="slide-out-right"></h1></div>
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/devices" element={<Devices getDeviceId={getDeviceId} getDeviceNo={getDeviceNo} getDeviceName={getDeviceName} />} />

         {/* // <Route path="/devices" element={<div>I am Device page</div>} /> */}

          <Route path="/cards" element={<Cards val={deviceId} val1={deviceNo} />} />
          <Route path="/messages" element={<Messages val={deviceId} number={deviceNo} name={deviceName} />} />

        </Routes>



      </header>
    </div>
  );
}

export default App;
