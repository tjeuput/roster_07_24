import { Typography } from 'antd';
import React, {useEffect, useState} from 'react';
import {invoke} from '@tauri-apps/api/tauri';  

const EinzelHw: React.FC = () => {
    const [dbMessage, setDbMessage] = useState<string | null>('null');

    useEffect(()=>{

        const dbCall = async () => {
            try {
                //database call
                // if successful, set the message
                const message = await invoke('check_database');
                setDbMessage(message as string);
                
            }catch(error){
                // Handle error
                console.error('Database check failed:', error);
                setDbMessage('Database check failed');
            }
        };
        dbCall();
    }, []);

    return (
        <div>
            <Typography.Text> {dbMessage && <p>{dbMessage}</p>}
             </Typography.Text>
        </div>
    );
};

export default EinzelHw;
