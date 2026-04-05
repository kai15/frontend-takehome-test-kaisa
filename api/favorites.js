import { supabase } from './_lib/supabase.js';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { userId, courseId } = req.query;

        if (courseId) {
            const { data, error } = await supabase
                .from('favorites')
                .select('*, user:users (id, name)')
                .eq('userId', userId)
                .eq('courseId', courseId)
                .single();

            if (error) return res.status(404).json({ error: 'Favorites not found' });
            return res.status(200).json(data);
        }
        
        if (userId) {
            const { data, error } = await supabase
                .from('favorites')
                .select('*, course:courses (id, title, description, category), user:users (id, name)')
                .eq('userId', userId);

            if (error) return res.status(404).json({ error: 'Favorites not found' });
            return res.status(200).json(data);
        }
        const { data, error } = await supabase
            .from('favorites')
            .select('*')

        if (error) return res.status(500).json({ error: error.message })

        return res.status(200).json(data)
    }

    if (req.method === 'POST') {
        const { courseId, userId } = req.body;

        if (!courseId || !userId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const { data, error } = await supabase
            .from('favorites')
            .insert([{ courseId, userId }])
            .select(`
                *,
                user:users (id, name)
            `)
            .single();

        if (error) return res.status(500).json({ error: error.message });
        return res.status(201).json(data);
    }

    if (req.method === 'PATCH') {
        const { courseId, userId } = req.body;
    
        if (!courseId || !userId) {
            return res.status(400).json({ error: 'Course ID and User ID are required' });
        }
    
        try {
            const { data: existingLike } = await supabase
                .from('favorites')
                .select('id')
                .eq('courseId', courseId)
                .eq('userId', userId)
                .single();
    
            if (existingLike) {
                await supabase.from('favorites').delete().eq('id', existingLike.id);    
                return res.status(200).json({ favorite: false });
            } else {
                await supabase.from('favorites').insert([{ courseId, userId }]);    
                return res.status(200).json({ favorite: true });
            }
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    if (req.method === 'DELETE') {
        const { id, userId } = req.query;

        if (!userId) {
            return res.status(400).json({ error: 'Favorites ID and User ID are required' });
        }

        if (Number(id) === 0) {
            const { error } = await supabase
            .from('favorites')
            .delete()
            .eq('userId', userId)

            if (error) return res.status(500).json({ error: error.message });
            return res.status(200).json({ message: 'All Favorites deleted successfully' });
        }

        const { error } = await supabase
            .from('favorites')
            .delete()
            .eq('id', id)
            .eq('userId', userId);

        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ message: 'Favorite deleted successfully' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
}