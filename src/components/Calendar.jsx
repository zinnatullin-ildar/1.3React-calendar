import PropTypes from 'prop-types';

const secondsPerDay = 86400;

function Calendar(props) {
    const { date } = props;
    const currentYear = date.getFullYear();
    const day = date.getDay();
    const month = date.getMonth();
    const currentDate = date.getDate();

    const currentMonth = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'][month];
    const currentMonthGenitive = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'][month];
    const currentDay = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'][day];

    // Устанавливаем дату с первого дня в году:
    const firstDate = new Date(currentYear, month, 1);
    const beforeFirstDate = new Date(firstDate.getTime() - secondsPerDay);
    const dateBeforeMonthStarts = beforeFirstDate.getDate();

    // Устанавливаем дату в месяце:
    const firstDateOfNextMonth = new Date(currentYear, (month + 1) <= 11 ? month + 1 : 0, 1)
    const lastDateOfMonth = new Date(firstDateOfNextMonth.getTime() - secondsPerDay);
    const dateMonthEnds = lastDateOfMonth.getDate();
    const monthDates = Array(dateMonthEnds).fill(0).map((x, index) => x = index + 1);

    // Добавление дней если месяц заканчивается не в воскресенье:
    let daysToUnshift;
    const dayOfFirstDate = firstDate.getDay();

    if (dayOfFirstDate === 0) { // воскресенье
        daysToUnshift = 6;
    } else {
        daysToUnshift = dayOfFirstDate - 1;
    }

    for (let i = 0; i < daysToUnshift; i++) {
        monthDates.unshift('' + (dateBeforeMonthStarts - i));
    }

    const daysToPush = 7 - monthDates.length % 7;

    for (let i = 0; i < daysToPush; i++) {
        monthDates.push('' + (1 + i));
    }

    const weeks = monthDates.length / 7;
    const weeksArray = [];
    for (let i = 0; i < weeks; i++) {
        weeksArray.push(monthDates.slice(i * 7, i * 7 + 7));
    }

    return (
        <div className="ui-datepicker">
            <div className="ui-datepicker-material-header">
                <div className="ui-datepicker-material-day">{currentDay}</div>
                <div className="ui-datepicker-material-date">
                    <div className="ui-datepicker-material-day-num">{currentDate}</div>
                    <div className="ui-datepicker-material-month">{currentMonth}</div>
                    <div className="ui-datepicker-material-year">{currentYear}</div>
                </div>
            </div>
            <div className="ui-datepicker-header">
                <div className="ui-datepicker-title">
                    <span className="ui-datepicker-month">{currentMonthGenitive}</span>&nbsp;<span
                        className="ui-datepicker-year">{currentYear}</span>
                </div>
            </div>
            <table className="ui-datepicker-calendar">
                <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col className="ui-datepicker-week-end" />
                    <col className="ui-datepicker-week-end" />
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col" title="Понедельник">Пн</th>
                        <th scope="col" title="Вторник">Вт</th>
                        <th scope="col" title="Среда">Ср</th>
                        <th scope="col" title="Четверг">Чт</th>
                        <th scope="col" title="Пятница">Пт</th>
                        <th scope="col" title="Суббота">Сб</th>
                        <th scope="col" title="Воскресенье">Вс</th>
                    </tr>
                </thead>
                <tbody>
                    {weeksArray.map((week, index) =>
                        <tr key={'week' + index}>
                            {week.map((date) =>
                                <td className={
                                    typeof date === 'string' ? 'ui-datepicker-other-month' : '' +
                                        typeof date === 'number' && date === currentDate ? 'ui-datepicker-today' : ''
                                } key={date}>{date}</td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

}

Calendar.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired
}

export default Calendar;