import { motion } from 'framer-motion';

interface EmptyDataProps {
    description?: string;
}

export default function EmptyData({ description }: EmptyDataProps) {
    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="col-span-full py-20 text-center"
        >
            <h3>{description ?? 'Oops! No courses found.'}</h3>
        </motion.div>
    )
}