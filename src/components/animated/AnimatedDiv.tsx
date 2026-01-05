import {AnimatePresence, motion} from "framer-motion";

interface AnimatedDivProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => any;
}

/**
 * This component animates the entrance of children with an opacity animation.
 */
export default function AnimatedDiv(props: AnimatedDivProps) {
  return (
    <AnimatePresence>
      <motion.div className={props.className ?? ""} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{delay: props.delay ?? 0, duration: 0.3}} onClick={() => {
        if (props.onClick) props.onClick()
      }}>
        {props.children}
      </motion.div>
    </AnimatePresence>
  );
}
