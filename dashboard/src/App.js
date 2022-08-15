import './App.css';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Gear from './widgets/Gear';
import Rpm from './widgets/Rpm';
import Speed from './widgets/Speed';

const localIp='192.168.0.126';

const socket = io(`ws://${localIp}:3001`);

function App() {

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('udp-message', (message) => {
      let data=JSON.parse(message.toString());
      setInfo(data);
      
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        Assetto Corsa Dashboard
      </header>
      <div>
        <div>
          <p>Connected: { '' + isConnected }</p>
          
        </div>
        { info!=null && isConnected &&
          <div>
            <Gear gear={info.physics.gear} />
            <Rpm maxRpm={info.static.max_rpm} actualRpm={info.physics.rpms} />
            <Speed speed={info.physics.speed_kmh} />
          </div>
        }
      </div>
      
    </div>
  );
}

export default App;
