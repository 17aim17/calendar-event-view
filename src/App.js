import "./styles.css";
import { Backdrop, CircularProgress } from '@material-ui/core'
import { useState, useEffect } from "react";
import Calendar from "./Calendar.js";
import axios from 'axios'
import {
  createDaysForCurrentMonth,
  createDaysForNextMonth,
  createDaysForPreviousMonth
} from './helpers'

export default function App() {

  const [data, setData] = useState({ isLoading: true });


  const getServerData = (continuationtoken) => {
    const requestBody = {
      "requestobjects": [
        {
          "posts": {
            "operationtype": "read",
            "id": {
              "return": true
            },
            "userid": {
              "searchvalues": ["adbef521-7cf6-4344-af48-a9480df46549"],
              "return": true
            },
            "iscalendarentry": {
              "searchvalues": ["true"],
              "return": true
            },
            "media": {
              "return": true
            },
            "rating": {
              "return": true
            },
            "text": {
              "return": true
            },
            "privacy": {
              "searchvalues": [
                18
              ],
              "return": true
            },
            "typeofday": {
              "return": true
            },
            "calendardatetime": {
              "return": true,
              "sort": "descending"
            },
            "maxitemcount": "20",
            "continuationtoken": continuationtoken
          }
        }
      ]
    }

    axios.post('https://api.quinn.care/graph', requestBody).then(res => {
      const { posts, continuationtoken } = res.data.responseobjects[0];
      const newData = {}
      const postsAsDateId = {}
      const postOrder = []

      posts.forEach(post => {
        const key = new Date(post.calendardatetime).toISOString().substring(0, 10);
        postsAsDateId[key] = post;
        postOrder.push(key)
      });


      if (data.hasOwnProperty('postsAsDateId') && data.hasOwnProperty('postOrder')) {
        newData.postsAsDateId = { ...data.postsAsDateId, ...postsAsDateId }
        newData.postOrder = [...data.postOrder, ...postOrder]
      } else {
        newData.postsAsDateId = postsAsDateId
        newData.postOrder = postOrder
      }

      newData.continuationtoken = continuationtoken
      newData.isLoading = false

      setData({ ...newData });
    })
  }

  useEffect(() => {
    getServerData(null)
  }, [])

  const [yearAndMonth, setYearAndMonth] = useState([new Date().getFullYear(), new Date().getMonth() + 1]);
  const [year, month] = yearAndMonth;
  let currentMonthDays = createDaysForCurrentMonth(year, month);
  let previousMonthDays = createDaysForPreviousMonth(
    year,
    month,
    currentMonthDays
  );

  let nextMonthDays = createDaysForNextMonth(year, month, currentMonthDays);

  let calendarGridDayObjects = [
    ...previousMonthDays,
    ...currentMonthDays,
    ...nextMonthDays
  ];


  useEffect(() => {
    let found = false;
    if (data.hasOwnProperty('continuationtoken') && data.continuationtoken && data.continuationtoken.hasOwnProperty('token')) {
      const toBeSearchDate = data.continuationtoken.token.split('|')[0].split(' ')[0].split('-').reverse().join('-');
      // console.log(toBeSearchDate);
      for (let day of calendarGridDayObjects) {
        if (day.dateString === toBeSearchDate) {
          found = true
          // console.log(toBeSearchDate + " found");
          getServerData(data.continuationtoken)
        }
      }
    }
  }, [calendarGridDayObjects, data])


  return (
    <div className="App">
      {
        data.isLoading ?
          <Backdrop className="backdrop" open>
            <CircularProgress size={20} color="primary" />
          </Backdrop>
          :
          <Calendar
            yearAndMonth={yearAndMonth}
            onYearAndMonthChange={setYearAndMonth}
            calendarGridDayObjects={calendarGridDayObjects}
            posts={data.postsAsDateId}
            postOrder={data.postOrder}
          />

      }
    </div>
  );
}
