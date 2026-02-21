export interface User {
    id: string;
    name: string;
}

export interface Comment {
    id: string;
    user: User;
    message: string;
    createdAt: string;
    likesCount: number;
    likedByUser: boolean;
}

export interface Course {
    id: string;
    title: string;
    description: string;
    content: string;
    category: string;
    duration: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    author: string;
    image: string;
    rating: number;
    createdAt: string;
    comments: Comment[];
}