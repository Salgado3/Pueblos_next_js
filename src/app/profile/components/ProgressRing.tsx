import { ActionIcon, RingProgress, Text, Center } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

const ProgressRing = () => {
  return (
    <div>
      <RingProgress
        sections={[{ value: 40, color: "blue" }]}
        label={
          <Text c="blue" fw={700} ta="center" size="xl">
            40%
          </Text>
        }
      />
    </div>
  );
};

export default ProgressRing;
