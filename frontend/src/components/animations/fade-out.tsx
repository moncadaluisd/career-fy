import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";

interface FadeOutProps {
  children: React.ReactNode;
  isVisible: boolean;
}

export const FadeOut: React.FC<FadeOutProps> = ({ children, isVisible }) => {
  return (
    <AnimatePresence initial={false}>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          key="box"
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

