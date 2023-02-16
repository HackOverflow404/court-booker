import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Courts from "./Courts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Timings from "./Timings";
import Form from "./Form";

function App() {
  const url = "http://localhost:8080/api/bookings";
  const [guestPrice, setGuestPrice] = useState(0);
  const [courts, setCourts] = useState([]);
  const [court, setCourt] = useState("");
  const [date, setDate] = useState(new Date());
  const [maxDateInterval, setMaxDateInterval] = useState(new Date());
  const [timings, setTimings] = useState([]);
  const [selectedTiming, setSelectedTiming] = useState("");
  const [formInput, setFormInput] = useState({
    firstName: "",
    lastName: "",
    houseNumber: "",
    phoneNumber: 0,
    email: "",
    guest: 0,
  });

  useEffect(() => {
    getCourts();
    getTimings();
    getGuestPrice();
    getMaxDate()
  });

  function getCourts() {
    axios
      .get(url + "/settings/courts")
      .then((res) => {
        const courts = res.data;
        setCourts(courts);
        if (court === "") {
          setCourt(courts[0]);
        }
      })
      .catch((err) => {
        console.error("API Request Error:", err);
      });
  }

  function getTimings() {
    const dateURL = date
      .toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replaceAll("/", "%252F");
    let bookedTimings;

    axios
      .get(url + "/settings/timeRange")
      .then((res) => {
        const timeRange = res.data;
        const start = new Date("January 1, 1970 " + timeRange[0]);
        const end = new Date("January 1, 1970 " + timeRange[1]);
        let timings = [];
        let availableTimings = [];

        while (start <= end) {
          let time = start.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
          timings.push(time);
          start.setUTCHours(start.getUTCHours() + 1);
        }

        axios
          .get(url + "/" + court + "/" + dateURL)
          .then((res) => {
            bookedTimings = res.data;
            availableTimings = timings.filter(
              (time) => !bookedTimings.includes(time)
            );
            setTimings(availableTimings);
            if (selectedTiming === "" || selectedTiming === undefined) {
              setSelectedTiming(availableTimings[0]);
            }
          })
          .catch((err) => {
            console.error("API Request Error:", err);
          });
      })
      .catch((err) => {
        console.error("API Request Error:", err);
      });
  }

  function getGuestPrice() {
    axios
      .get(url + "/settings/price")
      .then((res) => {
        const price = res.data;
        setGuestPrice(price);
      })
      .catch((err) => {
        console.error("API Request Error:", err);
      });
  }

  function getMaxDate() {
    axios
      .get(url + "/settings/maxDateInterval")
      .then((res) => {
        const maxDateInterval = res.data;
        setMaxDateInterval(maxDateInterval);
      })
      .catch((err) => {
        console.error("API Request Error:", err);
      });
  }

  function handleCalendarChange(newDate) {
    setDate(newDate);
    setSelectedTiming("");
    console.log(
      "Now selected " +
        newDate.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
    );
    console.log(date);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const booking = {
      court: court,
      date: date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      time: selectedTiming,
      fname: formInput.firstName,
      lname: formInput.lastName,
      hnum: formInput.houseNumber,
      pnum: formInput.phoneNumber,
      email: formInput.email,
      gnum: formInput.guest,
      paid: false,
    };

    console.log(booking);

    axios
      .post(url, booking)
      .then((res) => {
        console.log("Successfully made a new booking");
        alert("Made booking");
      })
      .catch((err) => {
        console.error("API Request Error:", err);
      });
    setSelectedTiming("");
  }

  return (
    <div className="App">
      <Courts
        getCourts={getCourts}
        setCourt={setCourt}
        setSelectedTiming={setSelectedTiming}
        value={court}
        courts={courts}
      />
      <Calendar
        className="Calendar"
        onChange={handleCalendarChange}
        minDate={new Date()}
        maxDate={
          new Date(new Date().setDate(new Date().getDate() + maxDateInterval - 1))
        }
        value={date}
      />
      <Form
        handleSubmit={handleSubmit}
        formInput={formInput}
        onChange={setFormInput}
        price={guestPrice}
      />
      <Timings
        setTiming={setSelectedTiming}
        value={selectedTiming}
        timings={timings}
      />
    </div>
  );
}

export default App;
