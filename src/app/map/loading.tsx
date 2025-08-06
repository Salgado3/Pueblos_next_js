import { Box, LoadingOverlay } from "@mantine/core";

export const Loading = () => {
  return (
    <div>
      {" "}
      <Box pos="relative">
        <LoadingOverlay
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        {/* ...other content */}
      </Box>
    </div>
  );
};

export default Loading;
