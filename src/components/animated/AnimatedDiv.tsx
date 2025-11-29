import {motion} from "framer-motion";

interface AnimatedDivProps {
  delay?: number;
  children: React.ReactNode;
}

export default function AnimatedDiv(props: AnimatedDivProps) {
  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: props.delay || 0}}>
      {props.children}
    </motion.div>
  );
}
