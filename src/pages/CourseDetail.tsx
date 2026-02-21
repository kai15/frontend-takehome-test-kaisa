import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import courseData from '@/data/data.json';
import { Clock, BarChart, Star, Users } from 'lucide-react';
import { CommentCard, EmptyData, Header } from '@/components';

export default function CourseDetail() {
    const { id } = useParams();
    const data = courseData.courses.find(v => v.id === id);

    if (!data) return <EmptyData description="Course not found." />

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [])

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-20 -mt-20">
            <Header back />
            {/* Header / Cover Image */}
            <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
                <img
                    src={data.image}
                    className="w-full h-full object-cover"
                    alt={data.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 dark:from-zinc-950 to-transparent" />
            </div>

            {/* Main Content Card */}
            <div className="max-w-8xl mx-auto px-6 -mt-52 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">

                    {/* Left Column: Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-xl shadow-zinc-200/50 dark:shadow-none"
                    >
                        <span className="px-4 py-1.5 bg-cyan-500/10 text-cyan-500 rounded-full text-xs font-bold uppercase tracking-wider">
                            {data.category}
                        </span>

                        <h1 className="text-3xl md:text-5xl font-black mt-4 mb-6 text-zinc-900 dark:text-white leading-tight">
                            {data.title}
                        </h1>

                        <div className="flex flex-wrap gap-6 mb-8 text-sm text-zinc-500 dark:text-zinc-400">
                            <div className="flex items-center gap-2">
                                <Users size={18} className="text-zinc-500 dark:text-cyan-500" />
                                <span>{data.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Star size={18} className="text-yellow-500 fill-yellow-500" />
                                <span className="font-bold text-zinc-900 dark:text-zinc-200">{data.rating}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <BarChart size={18} className="text-zinc-500 dark:text-cyan-500" />
                                <span className="text-zinc-600 dark:text-zinc-200">{data.level}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={18} className="text-zinc-500 dark:text-cyan-500" />
                                <span className="text-zinc-600 dark:text-zinc-200">{data.duration}</span>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-100">About this course</h3>
                        <div className="space-y-4 text-zinc-600 dark:text-zinc-300 text-md leading-relaxed">
                            {data.content.split('\n\n').map((val, i) => (
                                <p key={i}>{val}</p>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Sticky Sidebar Card */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="sticky top-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xl"
                        >
                            <CommentCard data={data.comments ?? []} id={id} />
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}