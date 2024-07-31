import React, { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

const EinzelHw: React.FC = () => {

  const [schedule, setSchedule] = useState('');

  const fetchSchedule = async () => {
    try {
      const response = await invoke<string>("get_table_schedule");
      console.log("Debug: Received response:",response);
      setSchedule(response);
    } catch (error) {
      console.error(error);
      setSchedule("Error occurred while fetching names");
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  return (
    <div>
      <h1>Employee Schedule</h1>
      <button onClick={fetchSchedule}>Refresh</button>
      <div id="schedule-msg">{schedule}</div>
    </div>
  );
}

export default EinzelHw;
