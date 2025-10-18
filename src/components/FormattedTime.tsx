import { Text } from '@mantine/core';

interface FormattedTimeProps {
  time: Date | string;
}

export const FormattedTime = ({ time }: FormattedTimeProps) => {
  const formatTime = (time: Date | string) => {
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return <Text>{formatTime(time)}</Text>;
};
