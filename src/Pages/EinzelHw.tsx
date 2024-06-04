import React, { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

const EinzelHw: React.FC = () => {
    
    const [schedule, setSchedule] = useState('');
useEffect(() => {
  const fetchSchedule = async () => {
    try {
      const response = await invoke<string>("get_table_schedule");
      setSchedule(response);
    } catch (error) {
      console.error(error);
      setSchedule("Error occurred while fetching names");
    }
  };
  fetchSchedule();
}, []);

    return (
        <div>
           <h1>Employee Schedule</h1>
            <div id="schedule-msg">{schedule}</div>
        </div>
    );
};

export default EinzelHw;
