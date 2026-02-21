import { motion } from "framer-motion"

interface ModalProps {
    setShowModal: any;
    handleChange: any;
}
export default function Modal({ setShowModal, handleChange }: ModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white dark:bg-zinc-900 w-full max-w-md p-6 rounded-3xl shadow-2xl"
            >
                <h2 className="text-2xl font-bold text-zinc-700 dark:text-zinc-200 mb-2">Hey, Welcome!</h2>
                <p className="text-zinc-700 dark:text-zinc-200 text-sm mb-4">Enter your name to access the courses.</p>

                <input
                    type="text"
                    autoFocus
                    placeholder="Your Name"
                    className="w-full placeholder:text-zinc-700 dark:placeholder:text-zinc-200 text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 border-none rounded-xl px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-cyan-500"
                    onKeyDown={handleChange}
                />

                <button
                    onClick={() => setShowModal(false)}
                    className="w-full text-sm text-zinc-700 dark:text-zinc-200 text-sm font-bold hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
                >
                    Maybe Later
                </button>
            </motion.div>
        </div>
    )
}