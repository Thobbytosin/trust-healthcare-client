import { useEffect, useState } from "react";

const useTooltip = (elementId: string) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // for tooltip location
  useEffect(() => {
    const trigger = document.getElementById(elementId);
    if (!trigger) return;

    const show = () => setShowTooltip(true);
    const hide = () => setShowTooltip(false);
    const toggle = () => setShowTooltip((prev) => !prev);

    // Desktop interactions
    trigger.addEventListener("mouseenter", show);
    trigger.addEventListener("mouseleave", hide);
    trigger.addEventListener("focus", show);
    trigger.addEventListener("blur", hide);

    // Mobile interaction
    trigger.addEventListener("click", toggle);

    return () => {
      trigger.removeEventListener("mouseenter", show);
      trigger.removeEventListener("mouseleave", hide);
      trigger.removeEventListener("focus", show);
      trigger.removeEventListener("blur", hide);
      trigger.removeEventListener("click", toggle);
    };
  }, [elementId]);

  return showTooltip;
};

export default useTooltip;
