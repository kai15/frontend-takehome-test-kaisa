import type { Comment } from "@/types"
import { AnimatePresence, motion } from "framer-motion";
import { Send, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react"
import { Modal, Select } from "@/components";

interface CommentCardProps {
    data: Comment[];
    id: any;
}

export default function CommentCard({ data, id }: CommentCardProps) {
    const [comments, setComments] = useState<Comment[]>(data ?? []);
    const [newComment, setNewComment] = useState('');
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'likes'>('newest');
    const [user, setUser] = useState<{ id: string, name: string }>(() => {
        const currentUser = localStorage.getItem('user_session');
        return currentUser ? JSON.parse(currentUser) : null;
    })
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const dataLocalComment = localStorage.getItem(`comments-${id}`);
        const dataLocalLiked = localStorage.getItem(`likedComment-${id}`);

        if (dataLocalComment) {
            try {
                const dataComment = JSON.parse(dataLocalComment);
                setComments(dataComment);
            } catch (_) {
                // ignore invalid JSON
            }
        }

        if (dataLocalLiked) {
            try {
                const dataLiked = JSON.parse(dataLocalLiked);
                const listComment = dataLocalComment ? JSON.parse(dataLocalComment) : Array.from(comments);
                dataLiked.map((item: any) => {
                    const checkData = listComment.findIndex((v: any) => v.id === item.id)
                    if (checkData > -1) {
                        listComment[checkData] = item;
                        setComments(listComment);
                    }
                    return;
                })
            } catch (_) {
                // ignore invalid JSON
            }
        }
    }, [])

    const sortedComments = [...comments].sort((a, b) => {
        if (sortBy === 'likes') {
            return b.likesCount - a.likesCount;
        }
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortBy.toLowerCase() === 'newest' ? dateB - dateA : dateA - dateB;
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!newComment.trim) return;

        const comment: Comment = {
            id: `comm-${Date.now()}`,
            user,
            message: newComment,
            createdAt: new Date().toString(),
            likesCount: 0,
            likedByUser: false
        };

        setComments([comment, ...comments])
        localStorage.setItem(`comments-${id}`, JSON.stringify([comment, ...comments]))
        setNewComment('');
    }

    const handleLike = (idComment: any, likedByUser: boolean) => {
        const tempComment = Array.from(comments);
        const isExist = tempComment.findIndex(v => v.id === idComment);
        if (isExist > -1) {
            const countData = likedByUser ? tempComment[isExist].likesCount - 1 : tempComment[isExist].likesCount + 1;
            tempComment[isExist] = { ...tempComment[isExist], likedByUser: !likedByUser, likesCount: countData }
            setComments(tempComment);
        }
        localStorage.setItem(`likedComment-${id}`, JSON.stringify(tempComment));
    }

    const handleDelete = (idComment: any) => {
        const tempComment = Array.from(comments);
        const isExist = tempComment.findIndex(v => v.id === idComment);
        if (isExist > -1) {
            tempComment.splice(isExist, 1)
            setComments(tempComment);
        }
        localStorage.setItem(`comments-${id}`, JSON.stringify(tempComment))
        localStorage.setItem(`likedComment-${id}`, JSON.stringify(tempComment));
    } 

    const handleInput = (e: any) => {
        if (e.key === 'Enter') {
            const name = (e.target as HTMLInputElement).value;
            if (name.trim()) {
                const user = { id: `user-${Date.now()}`, name };
                localStorage.setItem('user_session', JSON.stringify(user));
                setUser(user);
                setShowModal(false);
            }
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">{comments?.length ?? 0} Comments</h3>
                <Select data={["Newest", "Oldest", "Likes"]} onChange={setSortBy} includeAll={false} />
            </div>

            {user ? <form onSubmit={handleSubmit} className="mb-10">
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-200">
                        {user.name.charAt(0)}
                    </div>
                    <div className="flex-1 flex-col">
                        <textarea
                            rows={3}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="w-full placeholder:text-zinc-800 dark:placeholder:text-zinc-200 text-zinc-800 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 pr-12 text-sm focus:ring-2 focus:ring-cyan-500"
                        />
                        <button
                            type="submit"
                            disabled={!newComment.trim()}
                            className="p-2 bg-cyan-600 hover:bg-cyan-500 float-right"
                        >
                            <div className="flex gap-2 items-center">
                                <span className="text-sm text-zinc-200">Send</span>
                                <Send size={16} className="text-zinc-100" />
                            </div>
                        </button>
                    </div>
                </div>
            </form> :
            <div className="mb-5">
                <p className="text-zinc-700 dark:text-zinc-200 text-sm">
                    Please <span className="font-bold cursor-pointer text-cyan-600 dark:text-cyan-500" onClick={() => setShowModal(true)}>sign in</span> to leave a comment.
                </p>
            </div>}

            <div className="space-y-6">
                <AnimatePresence initial={false}>
                    {sortedComments?.map((value) => {
                        return (
                            <motion.div
                                key={value.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex gap-4 p-4 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all"
                            >
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shrink-0">
                                    {value.user.name.charAt(0)}
                                </div>
                                <div className="flex-1 items-center">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold text-sm text-zinc-700 dark:text-zinc-200">{value.user.name}</h4>
                                        <span className="text-xs text-zinc-500 dark:text-zinc-300 uppercase">{new Date(value.createdAt).toLocaleString()}</span>
                                    </div>
                                    <p className="text-sm text-zinc-700 dark:text-zinc-200 loading-relaxed text-left">{value.message}</p>
                                    <div className={`flex ${value?.user?.name === user?.name ? 'justify-between' : 'justify-end'} items-center`}>
                                        {(value?.user?.name === user?.name) && <div className="cursor-pointer" onClick={() => handleDelete(value.id)}>
                                            <p className="text-sm text-red-500 dark:text-red-500 hover:text-red-700 ">Delete</p>
                                        </div>}
                                        <button className="py-0 px-0" onClick={() => handleLike(value.id, value.likedByUser)}>
                                            <div className="flex gap-2 items-center">
                                                <ThumbsUp className={`text-yellow-600 ${value.likedByUser ? "fill-yellow-500 hover:fill-none" : "hover:fill-yellow-500"}`} size={20} />
                                                <p className="text-sm text-zinc-600 dark:text-zinc-200 loading-relaxed text-left">{value.likesCount}</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>
            {showModal && (
                <Modal handleChange={handleInput} setShowModal={setShowModal} />
            )}
        </div>
    )
}