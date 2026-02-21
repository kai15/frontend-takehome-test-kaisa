import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <header className="relative py-26 px-6 text-center border-b border-zinc-300 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50 overflow-hidden -mt-20">
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="absolute -top-[10%] left-[50%] -translate-x-1/2 w-[600px] h-[300px] bg-cyan-600/8 dark:bg-cyan-500/12 blur-[120px] rounded-full" />
            </div>
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-4xl md:text-6xl font-extrabold tracking-tight"
            >
                Level up your <span className="text-cyan-600 dark:text-cyan-500">Coding Skills</span>
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                className="mt-4 text-zinc-700 dark:text-zinc-400 text-lg max-w-2xl mx-auto"
            >
                Access high-quality courses curated for modern developers.
                Built with React, Tailwind, and TypeScript.
            </motion.p>
        </header>
    )
}