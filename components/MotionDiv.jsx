import { motion, AnimatePresence } from "framer-motion";

export default function MotionDiv({ children, ...props }) {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                {...props}
                >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}  