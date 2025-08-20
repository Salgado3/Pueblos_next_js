"use client";

import NotFoundOverlay from "@/components/NotFoundOverlay";

const errorPage = () => {
  return (
    <NotFoundOverlay
      title="Ope, looks like something went wrong!"
      showButton={true}
    />
  );
};

export default errorPage;
