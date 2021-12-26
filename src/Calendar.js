import React, { useState, useEffect } from 'react';
import classNames from "classnames";
import { Typography, IconButton } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import {
    daysOfWeek,
    isWeekendDay,
    getMonthDropdownOptions,
    getYearDropdownOptions,
    getMonthNames
} from "./helpers";
import CalendarCellContent from './CalendarCellContent';
import CalendarModal from './CalendarModal';


export default function Calendar({ yearAndMonth, onYearAndMonthChange, calendarGridDayObjects, posts, postOrder }) {
    const [year, month] = yearAndMonth;

    const [open, setOpen] = useState(false);

    const [openId, setOpenId] = useState(null);

    const handleOpen = (id) => {
        setOpenId(id);
        setOpen(!open);
    };

    const handleClose = () => {
        setOpenId(null);
        setOpen(false);
    };


    // const [scrollDir, setScrollDir] = useState("scrolling down");

    // useEffect(() => {
    //     const threshold = 0;
    //     let lastScrollY = window.pageYOffset;
    //     let ticking = false;

    //     const updateScrollDir = () => {
    //         const scrollY = window.pageYOffset;

    //         if (Math.abs(scrollY - lastScrollY) < threshold) {
    //             ticking = false;
    //             return;
    //         }
    //         if (scrollY > lastScrollY) {
    //             console.log("scrolling down");
    //             handleMonthNavForwardButtonClick()
    //         } else {
    //             console.log("scrolling up");
    //             handleMonthNavBackButtonClick()
    //         }

    //         setScrollDir(scrollY > lastScrollY ? "scrolling down" : "scrolling up");
    //         lastScrollY = scrollY > 0 ? scrollY : 0;
    //         ticking = false;
    //     };

    //     const onScroll = () => {
    //         if (!ticking) {
    //             window.requestAnimationFrame(updateScrollDir);
    //             ticking = true;
    //         }
    //     };

    //     window.addEventListener("scroll", onScroll);
    //     console.log(scrollDir);

    //     return () => window.removeEventListener("scroll", onScroll);
    // }, [scrollDir]);


    const handleMonthNavBackButtonClick = () => {
        let nextYear = year;
        let nextMonth = month - 1;
        if (nextMonth === 0) {
            nextMonth = 12;
            nextYear = year - 1;
        }
        onYearAndMonthChange([nextYear, nextMonth]);
    };

    const handleMonthNavForwardButtonClick = () => {
        let nextYear = year;
        let nextMonth = month + 1;
        if (nextMonth === 13) {
            nextMonth = 1;
            nextYear = year + 1;
        }
        onYearAndMonthChange([nextYear, nextMonth]);
    };

    // const handleMonthSelect = (evt) => {
    //     let nextYear = year;
    //     let nextMonth = parseInt(evt.target.value, 10);
    //     onYearAndMonthChange([nextYear, nextMonth]);
    // };

    // const handleYearSelect = (evt) => {
    //     let nextMonth = month;
    //     let nextYear = parseInt(evt.target.value, 10);
    //     onYearAndMonthChange([nextYear, nextMonth]);
    // };

    const monthNames = getMonthNames()

    const height = (window.innerHeight * .9) / 2
    return (
        <div className="calendar-root" >
            <div className="navigation-header">
                <div>
                    <IconButton style={{ position: 'fixed', top: height, left: '0px' }} onClick={handleMonthNavBackButtonClick}>
                        <ChevronLeftIcon />
                    </IconButton>
                    <IconButton style={{ position: 'fixed', top: height, right: '0px' }} onClick={handleMonthNavForwardButtonClick}>
                        <ChevronRightIcon />
                    </IconButton>
                    <Typography color="primary" component="p" variant="subtitle1">
                        My Diary
                    </Typography>
                </div>
                <div>
                    <Typography component="p" variant="subtitle1">
                        {monthNames[month - 1]} {year}
                    </Typography>
                </div>
                {/* <select
                    className="month-select"
                    value={month}
                    onChange={handleMonthSelect}
                >
                    {getMonthDropdownOptions().map(({ label, value }) => (
                        <option value={value} key={value}>
                            {label}
                        </option>
                    ))}
                </select>
                <select
                    className="year-select"
                    value={year}
                    onChange={handleYearSelect}
                >
                    {getYearDropdownOptions(year).map(({ label, value }) => (
                        <option value={value} key={value}>
                            {label}
                        </option>
                    ))}
                </select> */}
            </div>

            <div className="days-of-week">
                {daysOfWeek.map((day, index) => (
                    <div
                        key={day}
                        className={classNames("day-of-week-header-cell", {
                            "weekend-day": [6, 0].includes(index)
                        })}
                    >
                        {day}
                    </div>
                ))}
            </div>

            <div className="days-grid" id="daysDiv" >
                {calendarGridDayObjects.map((day) => (
                    <div
                        key={day.dateString}
                        className={classNames("day-grid-item-container", {
                            "weekend-day": isWeekendDay(day.dateString),
                            "current-month": day.isCurrentMonth
                        })}
                    > <div className="day-content-wrapper" onClick={() => {
                        if (!posts[day.dateString]) return
                        handleOpen(day.dateString)
                    }}>
                            <CalendarCellContent posts={posts} calendarDayObject={day} />
                        </div>
                    </div>
                ))}
            </div>
            <CalendarModal
                open={open}
                onClose={handleClose}
                posts={posts}
                postOrder={postOrder}
                postId={openId}
            />
        </div >
    );
}