import { supabase } from './_lib/supabase.js';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const {
        id, 
        page = 1, 
        limit = 10, 
        category, 
        search 
    } = req.query;

    const from = (Number(page) - 1) * Number(limit);
    const to = from + Number(limit) - 1;

    try {
        if (id) {
            const { data, error } = await supabase
                .from('courses')
                .select(`
                    *,
                    comments (
                        id,
                        message,
                        createdAt,
                        user:users (id, name, avatar),
                        likesCount,
                        likedByUser,
                        likedByOtherUser:comment_likes(userId)
                    )
                `)
                .eq('id', Number(id))
                .single();

            if (error) return res.status(404).json({ error: 'Course not found.' });

            return res.status(200).json(data);
        }
        let query = supabase
            .from('courses')
            .select('*', { count: 'exact' });

        // filter category
        if (category) {
            query = query.eq('category', category);
        }

        // filter title
        if (search) {
            query = query.ilike('title', `%${search}%`);
        }

        const { data, error, count } = await query
            .order('createdAt', { ascending: false })
            .range(from, to);

        if (error) throw error;

        return res.status(200).json({
            data,
            meta: {
                total_data: count,
                current_page: Number(page),
                limit: Number(limit),
                total_pages: Math.ceil(count / Number(limit))
            }
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}