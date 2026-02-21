interface SelectProps {
    data: any[];
    onChange: any;
    includeAll?: boolean;
}

export default function Select({ data, onChange, includeAll = true }: SelectProps) {
    return (
        <div className="relative">
            <select
                className='w-full text-sm text-zinc-800 dark:text-zinc-200 border border-zinc-800 rounded-lg py-2 px-4 focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all'
                onChange={(e) => onChange(e.target.value)}
            >
                {includeAll && <option key={'All'}>All</option>}
                {data?.map((val: string) => {
                    return (
                        <option key={val}>{val}</option>
                    )
                })}
            </select>
        </div>
    )
}