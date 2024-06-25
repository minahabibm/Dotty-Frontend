import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import TaskScheduler from '../../utils/TaskScheduler';
import { RetryConnectionProps } from '../../types/WebSockets'


const RetryConnection: React.FC<RetryConnectionProps> = ({ connect }) => {
  const [retryScheduler, setRetryScheduler] = useState<TaskScheduler | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [connecting, setConnecting] = useState(false);
  
  const connectWithRetry = async () => {
    setConnecting(true);
    try {
      await connect();
    } catch (error) {
      console.error('Failed to connect:', error);
    }
    setConnecting(false);
  };

  const updateCountdown = () => {
    const seconds = retryScheduler?.getSecondsLeft() ?? null;
    setSecondsLeft(seconds === 0 ? 0 : seconds);
  };

  useEffect(() => {
    if (!retryScheduler) {
      const scheduler = new TaskScheduler(connectWithRetry, 10000);           // Retry every 10 seconds
      scheduler.start();
      setRetryScheduler(scheduler);
    }

    updateCountdown(); // Update immediately on mount
    const countdownInterval = setInterval(updateCountdown, 1000);             // updating the counter every 1 seconds
    
    return () => {
      clearInterval(countdownInterval);
      retryScheduler?.stop();
    };
  }, [connect, retryScheduler]);

  return ( 
    <View style={styles.container}>
      <Text>
        {!connecting ? `Retrying connection in ${secondsLeft} seconds.` : 'connecting..'} 
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    alignItems: 'center'
  }
});


export default RetryConnection;