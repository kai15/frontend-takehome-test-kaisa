interface LoadingCardProps {
    length: number;
}

export default function LoadingCard({length}: LoadingCardProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: length ?? 3 }).map((_, val) => {
                return <div key={val} className="h-80 bg-zinc-200 dark:bg-zinc-900 rounded-xl animate-pulse border border-zinc-100 dark:border-zinc-800" />
            })}
        </div>
    )
}