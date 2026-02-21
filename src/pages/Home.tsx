import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CourseCard, EmptyData, Hero, Header, Input, LoadingCard, Select, Pagination } from '@/components';
import courseData from '@/data/data.json';
import type { Course } from '@/types';

export default function Home() {
    const [courses] = useState<Course[]>(courseData.courses as Course[]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const pageSize = 6;
    const listCategory = courseData?.categories ?? [];

    const handleFilter = (val: string, type: string) => {
        setPage(1);
        switch (type) {
            case "search":
                setSearch(val);
                break
            case "category":
                setCategory(val);
                break
            default: break
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        window.scrollTo({ top: 0, behavior: "smooth" })
        return () => clearTimeout(timer);
    }, [])

    const filterData = useMemo(() => {
        return courses.filter((value) => {
            const isExist = value.title.toLowerCase().includes(search.toLowerCase());
            const isExistCategory = category === 'All' || value.category === category;
            return isExist && isExistCategory;
        })
    }, [search, category, courses])

    const totalPage = Math.ceil(filterData.length / pageSize);

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white p-0 transition-colors duration-300">
            {/* Header */}
            <Header back={false} />

            {/* Hero Section */}
            <Hero />

            {/* Course Section */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Search & Filter Category */}
                <div className="flex items-center justify-between w-full mb-8 gap-2">
                    <Input type='search' onChange={(val: string) => handleFilter(val, 'search')} />
                    <Select data={listCategory} onChange={(val: string) => handleFilter(val, 'category')} />
                </div>

                {/* Total Data */}
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-bold">Available Classes</h2>
                    <span className="text-sm text-zinc-500 dark:text-zinc-300">{loading ? 0 : filterData.length} Courses Found</span>
                </div>

                {/* Course Card */}
                {loading ? <LoadingCard length={3} />
                    : <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode='popLayout'>
                            {filterData?.length > 0 ? filterData?.slice(page * pageSize - pageSize, page * pageSize)?.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            )) : <EmptyData description="Oops! No Courses found." />}
                        </AnimatePresence>
                    </motion.div>}

                {!loading && <Pagination length={filterData.length} page={page} pageSize={pageSize} totalPage={totalPage} setPage={setPage} />}
            </main>
        </div>
    );
}