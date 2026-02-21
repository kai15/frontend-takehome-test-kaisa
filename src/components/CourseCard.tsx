import type { Course } from '@/types';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
    course: Course;
}

export default function CourseCard({ course }: Props) {
    return (
        <Link to={`/course/${course.id}`}>
            <motion.div
                layout
                key={course.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="group bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:border-cyan-600/80 dark:hover:border-cyan-500/50 transition-all duration-300 shadow-md"
            >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 border border-transparent rounded-2xl"
                    />
                    <div className="absolute top-3 left-3">
                        <span className="bg-cyan-600/80 dark:bg-zinc-900/80 backdrop-blur-md text-zinc-100 dark:text-cyan-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-white/10">
                            {course.category}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-sm md:text-md text-zinc-800 dark:text-zinc-100 font-bold leading-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors text-left">
                            {course.title}
                        </h3>
                        <div className="flex items-center text-yellow-500 text-xs md:text-sm font-bold">
                            <Star className="fill-yellow-500" size={16} /> <span className="ml-1 text-zinc-900 dark:text-white">{course.rating}</span>
                        </div>
                    </div>

                    <p className="text-zinc-500 dark:text-zinc-200 text-sm text-left line-clamp-2 mb-4">
                        {course.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-zinc-800 dark:border-zinc-600">
                        <div className="flex items-center">
                            <div className="w-7 h-7 rounded-full bg-zinc-700 text-zinc-200 flex items-center justify-center text-[10px] font-bold">
                                {course.author.charAt(0)}
                            </div>
                            <span className="ml-2 text-xs text-zinc-900 dark:text-zinc-200">{course.author}</span>
                        </div>
                        <span className="text-[11px] text-zinc-500 dark:text-zinc-300 uppercase tracking-tighter">
                            {course.duration}
                        </span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};