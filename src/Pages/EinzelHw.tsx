import React, { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

const EinzelHw: React.FC = () => {
    
    const [message, setMessage] = useState('');
useEffect(() => {
  const fetchGreeting = async () => {
    try {
      const response = await invoke<string>("greet");
      setMessage(response);
    } catch (error) {
      console.error(error);
      setMessage("Error occurred while fetching names");
    }
  };
  fetchGreeting();
}, []);

    return (
        <div>
           <h1>Employee Names</h1>
            <div id="greet-msg">{message}</div>
        </div>
    );
};

export default EinzelHw;
