import React, { useEffect, useState } from "react";
import Card from "./UI/Card";
import Search from "./UI/Search";

const UserPart = (props) => {
  const [time, setTime] = useState();
  const [greetings, setGreetings] = useState("");
  const [username, setUsername] = useState();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dateFunction = (d) => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  const fetchTime = () => {
    let d = new Date();
    let date = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    let day = d.getDay();
    let s = d.getSeconds();
    let m = d.getMinutes();
    let h = d.getHours();
    const textContent =
      ("0" + h).substr(-2) +
      ":" +
      ("0" + m).substr(-2) +
      ":" +
      ("0" + s).substr(-2);
    const data = { textContent, h, m, s, d, date, month, year, day };
    setTime(data);
  };

  const fetchUser = async () => {
    const token = localStorage.getItem('token');

    const user = await fetch('https://dashboard-7611d-default-rtdb.firebaseio.com/users/' + token + '.json');

    const userData = await user.json();
    setUsername(userData.name);
  }

  useEffect(() => {
    fetchUser();
  }, [username])

  useEffect(() => {
    if (time) {
      if (time.h <= 11 && time.h >= 4) {
        setGreetings("Good Morning");
      } else if (time.h > 11 && time.h < 17) {
        setGreetings("Good Afternoon");
      } else {
        setGreetings("Good Evening");
      }
    } else {
      setGreetings("Hello");
    }
  }, [time]);

  useEffect(() => {
    const watchInterval = setInterval(fetchTime, 1000);

    return () => {
      clearInterval(watchInterval);
    };
  }, []);

  if (!time) {
    return <div></div>;
  }
  return (
    
      <div
      className={
        "col-12 col-sm-12 col-md-6 col-lg-4 col-mobile p-0 p-sm-2 mb-2 mb-sm-0"
      }
    >
      <Card className={`h-100`}>
        <div className={`d-flex flex-column justify-content-around user-card h-100`}>
          <div className={`name`}>
            {greetings}, <br /> {username}
          </div>
          <div className={`date`}>{time.textContent}</div>
          <div className={`date`}>
            {days[time.day]}, {time.date}
            {dateFunction(time.date)} {monthNames[time.month]} {time.year}
          </div>
          <Search />
        </div>
        
      </Card>
    </div>
  );
};

export default UserPart;
