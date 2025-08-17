import { ActionIcon, RingProgress, Text, Center } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

const ProgressRing = ({ valueCount }: { valueCount: number }) => {
  const percentage = Math.round((valueCount / 134) * 100);

  return (
    <div>
      <RingProgress
        sections={[{ value: percentage, color: "blue" }]}
        label={
          <Text c="blue" fw={700} ta="center" size="xl">
            {percentage}%
          </Text>
        }
      />
    </div>
  );
};

export default ProgressRing;
