import StarRating from './StarRating'
import TypeOfDay from './TypeOfDay'
import { getMonthNames } from './helpers'

export default ({ calendarDayObject, posts }) => {
    const monthNames = getMonthNames()

    const { dateString, dayOfMonth, isCurrentMonth, isNextMonth, month, nextMonth } = calendarDayObject;

    return (
        <div className="day-grid-item-header" >
            <span>{calendarDayObject.dayOfMonth}</span>
            <span style={{ marginLeft: '2px' }}>{dayOfMonth === 1 && isCurrentMonth && monthNames[month - 1]}
                {dayOfMonth === 1 && !isCurrentMonth && isNextMonth && monthNames[nextMonth - 1]}</span>

            {posts && posts[dateString] && <div style={{ display: 'flex', flexDirection: 'column' }}>
                <StarRating rating={posts[dateString].rating} />
                <img style={{ width: "100%", objectFit: "cover" }} src={posts[dateString].media[0].mediaurl} />
                <TypeOfDay typeofday={posts[dateString].typeofday} />
            </div>}
        </div>

    );
}