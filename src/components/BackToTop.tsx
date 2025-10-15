import { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import { IconArrowNarrowUp } from "@tabler/icons-react";

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    const checkScrollHeight = () => {
      if (!showButton && window.pageYOffset > 400) {
        setShowButton(true);
      } else if (showButton && window.pageYOffset <= 400) {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", checkScrollHeight);
    return () => {
      window.removeEventListener("scroll", checkScrollHeight);
    };
  }, [showButton]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      style={{
        fontSize: "1rem",
        fontWeight: "600",
        width: "fit-content",
        margin: "1rem 0",
      }}
      variant="outline"
      radius="md"
      leftSection={<IconArrowNarrowUp />}
      onClick={scrollToTop}
    >
      <span>Back To Top</span>
    </Button>
  );
};

export default BackToTopButton;
