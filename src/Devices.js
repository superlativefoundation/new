// device.js
import React, { useState, useEffect } from 'react';
import { db } from './config';
import { ref, onValue, DataSnapshot, remove } from 'firebase/database';
import notificationSound from './notification.mp3';


// import Messages from './Messages';
// import Cards from './Cards';
import './Devices.css'; // Import your external CSS file.
import { NavLink } from 'react-router-dom';


function Devices({ getDeviceId, getDeviceNo, getDeviceName }) {
  const [todoData, setTodoData] = useState([]);
  const [msg, setMsg] = useState();
  const [no, setNo] = useState();
  

  useEffect(() => {

    const playNotificationSound = () => {
      const audio = new Audio(notificationSound);
      audio.play();
    };

    const starCountRef = ref(db, 'Devices');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const newPost = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
     
     
      

      const devicesSeenData = localStorage.getItem('devicesSeen');
  const deviceSeen = devicesSeenData ? JSON.parse(devicesSeenData) : [];
       
      if (newPost.filter(d => !deviceSeen.includes(d.id)).length > 0) {
        // New device(s) added!
        const newDeviceIds = newPost.map(d => d.id);
        localStorage.setItem('devicesSeen', JSON.stringify(newDeviceIds));
          
        playNotificationSound();

        // alert('A new device has been added to the list.');
      }

      newPost.sort((a, b) => b.INSTALLED_TIME - a.INSTALLED_TIME || 0);

     


      setTodoData(newPost);
    });
  }, []);
  
  const handleDeleteMessage = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete ?");
    if (confirmDelete) {
      const messageRef = ref(db, `Devices/${id}`);
      remove(messageRef)
        .then(() => {
          setTodoData(prevData => prevData.filter(item => item.id !== id));
        })
        .catch((error) => {
          console.error('Error removing message: ', error);
        });
    }
  };
  const showMsg = (item) => {
    if (!item || !item.id) {
        // Handle the case where item or item.id is undefined or null
        return;
    }

    const deviceId = item.id;
    const deviceName = item.names ? Object.values(item.names)?.[0] : "NA";
    const deviceNumber = item.numbers ? Object.values(item.numbers)?.[0] : "NA";

    localStorage.setItem(item.id, "y");

    setMsg(deviceId);
    setNo(deviceNumber);

    getDeviceId(deviceId);
    getDeviceName(deviceName);
    getDeviceNo(deviceNumber);
};


  return (
    <div className="container" id="specificElementId">
      <div>
        <div className='header'>
          <h1 data-mdb-toggle="animation" data-mdb-animation-reset="true" data-mdb-animation="slide-out-right">
            Devices List
          </h1>
        </div>
        <ul className="list-group">
          {todoData.map((item, index) => (
            
           
            <div key={index}>
              {/* <span  className='numbering'></span>  */}
              <br />
              <NavLink to="/messages" style={{color:'black', textDecoration: 'none' }}>
                <div
                  className={localStorage.getItem(item.id) == null ?
                    "boxUnVisited" : " boxVisited"}
                  onClick={() => showMsg(item)}>
                 <b> {index + 1}. </b> Name - {item.names === undefined ? item.id : Object.values(item.names)[0]} &ensp; &ensp;
                  {item.numbers === undefined ? `` : `Mobile no - ${Object.values(item.numbers)[0]}`} &ensp; &ensp;
                  <span className='isonline'>
                    Status -
                    {item.isOnline === true ? `Online` : item.isOnline === false ? `Offline` : `Not Available`}
                  </span>
                  
                </div>
                
                <br />
              </NavLink>
              <div className='deletebutton' >
                    <button onClick={() => handleDeleteMessage(item.id)}>Delete</button>
                  </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Devices;
