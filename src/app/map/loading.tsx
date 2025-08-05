import { Box, LoadingOverlay } from "@mantine/core";

import React from "react";

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
