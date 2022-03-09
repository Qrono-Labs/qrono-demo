import logo from './logo.svg';
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
  const events, setEvents = useState([])

  useEffect(() => {
    const itemId = "itm_zVr4gYr"
    QronoClient.get(`items/${itemId}/events?start=2021-06-06T02:57:46+00:00&end=2021-08-06T02:57:46+00:00`)
    .then(res => res.json())
    .then(
      (result) => {
        setEvents({
          isLoaded: true,
          items: result.items
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }, [])

  
  // after user selects events, render a next page, where they can enter info
  // after they enter their info, create a booking for the user

  // render booking calendar
  return (
    <div className="App">
      <header className="App-header">
        <QronoCalendar
          bookingPickerType={'timeRangePicker'}
          defaultAvailable={true}
          onSelectStart={()=>{}}
          onSelectEnd={()=>{}}
          events={[]}
        />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
