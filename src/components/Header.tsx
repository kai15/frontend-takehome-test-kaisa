import { Sun, Moon, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';

interface HeaderProps {
    back: boolean;
}

export default function Header({back = false}: HeaderProps) {
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('mode');
        return savedMode ? savedMode === 'dark' : true;
    });

    useEffect(() => {
        const root = window.document.documentElement;

        if (darkMode) {
            root.classList.add('dark');
            localStorage.setItem('mode', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('mode', 'light');
        }
    }, [darkMode])

    return (
        <nav className="px-6 py-4 flex justify-between items-center sticky top-0 z-50">
            {back ? <Link to={"/"} className="flex items-center gap-2 text-zinc-500 hover:text-cyan-700 transition-colors cursor-pointer bg-zinc-200/80 hover:bg-zinc-200/100 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/100 p-2 rounded-lg">
                    <ArrowLeft size={20} className="text-cyan-700 dark:text-cyan-500" /> <span className="text-xs text-cyan-700 dark:text-cyan-500 font-bold">Back to Home</span>
                </Link>
            : <div />}
            <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg border border-zinc-900 dark:border-white bg-zinc-100 dark:bg-zinc-900 hover:ring-2 transition-all"
            >
                <div className="flex items-center gap-2">
                    {!darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={22} className="text-zinc-100" />}
                    <span className="dark:text-white text-zinc-500 text-xs">{darkMode ? "Dark Mode" : "Light Mode"} Active</span>
                </div>
            </button>
        </nav>
    )
}