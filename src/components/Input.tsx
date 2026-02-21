import { Search } from 'lucide-react';

interface InputProps {
    type: 'text' | 'search';
    onChange: any;
}

export default function Input({ type = 'text', onChange }: InputProps) {
    return (
        <div className="relative w-full max-w-md">
            {type === 'search' && <div className="absolute left-3 top-2.5">
                <Search size={18} strokeWidth={2.5} />
            </div>}
            <input
                type="text"
                placeholder='Search course title'
                className="w-full placeholder:text-zinc-800 dark:placeholder:text-white border border-zinc-800 rounded-lg py-1.5 pl-10 pr-4 focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all"
                onChange={(e) => onChange(e?.target.value)}
            />
        </div>
    )
}