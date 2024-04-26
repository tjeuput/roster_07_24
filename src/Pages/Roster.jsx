import React, { useState } from 'react';
import dayjs from 'dayjs';
import './Roster.css';

const CalendarHeader = ({ currentYear, onPrevYear, onNextYear }) => (
  <div className="calendar-header">
    <button onClick={onPrevYear}>{"<"}</button>
    <span>{currentYear}</span>
    <button onClick={onNextYear}>{">"}</button>
  </div>
);

const MonthGrid = ({ currentYear }) => {
  const months = Array.from({ length: 12 }, (_, i) => ({
    name: dayjs(new Date(currentYear, i)).format('MMMM'),
    days: new Date(currentYear, i + 1, 0).getDate(),
  }));

  return (
    <div className="month-grid">
      {months.map((month, index) => (
        <div key={index} className="month-column">
          <div className="month-name">{month.name}</div>
          {Array.from({ length: month.days }, (_, i) => (
            <div key={i} className="day-cell">{i + 1}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

const ResourceRow = ({ resources }) => (
  <div className="resource-row">
    {resources.map(resource => (
      <div key={resource.id} className="resource-name">
        {resource.name}
      </div>
    ))}
  </div>
);

function Roster() {
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const [resources, setResources] = useState([
    { id: 1, name: 'Resource 1' },
    { id: 2, name: 'Resource 2' },
    { id: 3, name: 'Resource 3' },
    { id: 4, name: 'Resource 4' },
    // ... more resources
  ]);

  const onPrevYear = () => setCurrentYear(currentYear - 1);
  const onNextYear = () => setCurrentYear(currentYear + 1);

  return (
    <div className="roster-container">
      <CalendarHeader
        currentYear={currentYear}
        onPrevYear={onPrevYear}
        onNextYear={onNextYear}
      />
      <MonthGrid currentYear={currentYear} />
      <ResourceRow resources={resources} />
    </div>
  );
}

export default Roster;
