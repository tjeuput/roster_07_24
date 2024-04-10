import React from 'react';

// Define the types for your component props and state
type CalendarState = {
    months: string[];
    days: number[];
    data: string[][]; // Array of arrays, one for each month
};

class EinzelauszugATbl extends React.Component<{}, CalendarState> {
    constructor(props: {}) {
    super(props);
    this.state = {
      months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'November', 'Dezember'],
      days: Array.from({ length: 31 }, (_, i) => i + 1),
      data: Array(12).fill(Array(31).fill('fr')), // 12 months, 31 days filled with 'dummy'
    };
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Monat</th>
            {this.state.days.map(day => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.state.months.map((month, i) => (
            <tr key={month}>
              <td>{month}</td>
              {this.state.data[i].map((data, j) => (
                <td key={j}>{data}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default EinzelauszugATbl;
