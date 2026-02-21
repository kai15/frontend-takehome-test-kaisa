export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full py-2 border-t border-zinc-200 dark:border-zinc-700 bg-zinc-200/70 dark:bg-zinc-900">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                <div className="text-center">
                    <h2 className="text-sm font-bold tracking-tighter text-zinc-800 dark:text-zinc-100">
                        Frontend Take Home <span className="text-cyan-600 dark:text-cyan-500">Test</span>
                    </h2>
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-200">
                        &copy; {currentYear} All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}