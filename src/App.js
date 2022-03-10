import './App.css';

import { QronoCalendar } from 'booking_calendar';
import QronoClient from './QronoClient';
import { useEffect, useState } from 'react';

function App() {

  // FOR SETTINGS AVAILABILITY:
  // create input fields for a tattoo artist to set their availability
  // tattoo artist sets availability
  // tattoo artist submits availability, which creates events on their item

  // FOR DISPLAYING AVAILABILITY TO CUSTOMER:
  // getEvents from Qrono
  // there should probably be a qrono.js function for this
  // put the events into the calendar
  const [events, setEvents] = useState([])
  const [start, setStart] = useState()
  const [end, setEnd] = useState()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [showCalendar, setShowCalendar] = useState(true)

  useEffect(() => {
    const itemId = "itm_zVr4gYr"
    QronoClient.get(`items/${itemId}/events?start=2021-01-06T02:57:46+00:00&end=2022-10-06T02:57:46+00:00`)
    .then(
      (result) => {
        // transform events received from API into calendar events
        const parsedEvents = result.map(event => {
          return {
            start:new Date(event.start_time), 
            end:new Date(event.end_time),
            eventType:event.event_type
          }
        })
        setEvents(parsedEvents);
      },
      (error) => {
        setEvents([]);
      }
    )
  }, [])


  const onSubmit = (e) => {
    e.preventDefault()
    const customer = {
      account:'tattoo_test', // insert account handle
      email,
      full_name:name,
      phone
    }
    const itemId = "itm_zVr4gYr"
    QronoClient.post(`bookings/`,{customer, end, item_id:itemId, start})
    .then((result) => {
      const startStr = new Date(result.start).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 
      const endStr = new Date(result.end).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 
      const res = `Congratulations: You have booked the item from ${startStr} to ${endStr}`
      setShowForm(false)
      if(result.id){
        setMessage(res)
      } else {
        setMessage('There was an error creating your booking')
      }
    })
  }
  // after user selects events, render a next page, where they can enter info
  // after they enter their info, create a booking for the user

  // render booking calendar
  return (
    <div className="App">
      {showCalendar? <div>
        <QronoCalendar
          bookingPickerType={'bookableEvents'}
          defaultAvailable={true}
          onSelectStart={(start)=>setStart(start)}
          onSelectEnd={(end)=>setEnd(end)}
          events={events}
        />
        <button className="next_button" onClick={()=> {setShowCalendar(false);setShowForm(true)}}>Next</button>
        </div>:null}
      {showForm  ? (
        <div>
        <div className='justify-center form-container'>
          <h2>Contact information</h2>
          <div className='flex'>
            <input type="text" id="name" name="name" placeholder='Full Name' value={name} onChange={(e) =>setName(e.target.value)} /><br/><br/>
          </div>
          <div className='flex'>
            <input type="email" id="email" name="email" placeholder='Email' value={email} onChange={(e) =>setEmail(e.target.value)} /><br/><br/>
          </div>
          <div className='flex'>
            <input type="tel" id="phone" name="phone" placeholder='Phone number' value={phone} onChange={(e) =>setPhone(e.target.value)}/><br/><br/>
          </div>
          <button className="next_button" onClick={onSubmit}>Create Booking</button>
        </div>
        </div>
      ):null}
      {message ? (
        <div>
          <img className='succesImg' src="https://www.clipartmax.com/png/full/179-1795386_patient-success-success-icon-png.png" alt="clipart checkbox"/>
          <div className='message'>
            {message}
            <button className="next_button" onClick={()=>{setMessage(''); setShowCalendar(true)}}>Create new booking</button>
          </div>
        </div>
      ):null}
    </div>
  );
}

export default App;
