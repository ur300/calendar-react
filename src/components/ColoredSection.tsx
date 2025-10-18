import { Box } from '@mantine/core';

interface ColoredSectionProps {
  color?: string;
  children: React.ReactNode;
}

export const ColoredSection = ({ color = '#3b82f6', children }: ColoredSectionProps) => {
  return (
    <Box style={{ backgroundColor: color, padding: '8px', borderRadius: '4px' }}>
      {children}
    </Box>
  );
};
