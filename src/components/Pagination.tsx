import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
    setPage: any;
    page: number;
    pageSize: number;
    totalPage: number;
    length: number;
}

export default function Pagination({ setPage, page = 1, pageSize, totalPage, length }: PaginationProps) {
    const lastPage = page * pageSize;
    const firstPage = lastPage - pageSize;

    const handlePagination = (offset: number) => {
        setPage(offset);
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <div>
            <div className="mt-10 flex justify-center items-center gap-2">
                {/* Previous Button */}
                <button
                    onClick={() => handlePagination(page - 1)}
                    disabled={page === 1}
                    className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 disabled:opacity-30 hover:border-cyan-700 dark:hover:border-cyan-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all"
                >
                    <ChevronLeft size={20} />
                </button>

                {/* Page Numbers */}
                {[...Array(totalPage)].map((_, index) => {
                    const pageNum = index + 1;
                    return (
                        <button
                            key={pageNum}
                            onClick={() => handlePagination(pageNum)}
                            className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${page === pageNum
                                ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/30"
                                : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                }`}
                        >
                            {pageNum}
                        </button>
                    );
                })}

                {/* Next Button */}
                <button
                    onClick={() => handlePagination(page + 1)}
                    disabled={page === totalPage}
                    className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 disabled:opacity-30 hover:border-cyan-700 dark:hover:border-cyan-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            <p className="text-center text-xs text-zinc-500 mt-6 font-medium">
                Showing {firstPage + 1} to {Math.min(lastPage, length)} of {length} courses
            </p>
        </div>
    )
}