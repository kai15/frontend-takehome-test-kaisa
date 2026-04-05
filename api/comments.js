import { supabase } from './_lib/supabase.js';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { courseId } = req.query;
        if (courseId) {
            const { data, error } = await supabase
                .from('comments')
                .select('*, user:users (id, name, avatar), likedByOtherUser:comment_likes(userId)')
                .eq('courseId', courseId)

            if (error) return res.status(404).json({ error: 'Comment not found' });
            return res.status(200).json(data);
        }
        const { data, error } = await supabase
            .from('comments')
            .select('*')

        if (error) return res.status(500).json({ error: error.message })

        return res.status(200).json(data)
    }

    if (req.method === 'POST') {
        const { courseId, userId, message } = req.body;

        if (!courseId || !userId || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const { data, error } = await supabase
            .from('comments')
            .insert([{ courseId, userId, message }])
            .select(`
                *,
                user:users (id, name)
            `)
            .single();

        if (error) return res.status(500).json({ error: error.message });
        return res.status(201).json(data);
    }

    if (req.method === 'PATCH') {
        const { id, userId, message } = req.body;

        if (!id || !userId) {
            return res.status(400).json({ error: 'Comment ID and User ID are required' });
        }

        if (message) {
            const { data, error } = await supabase
            .from('comments')
            .update({
                message
            })
            .eq('id', id)
            .eq('userId', userId)
            .select()
            .single();
    
          if (error) throw error;
    
          return res.status(200).json(data);
        }

        try {
            const { data: existingLike } = await supabase
                .from('comment_likes')
                .select('id')
                .eq('commentId', id)
                .eq('userId', userId)
                .single();

            if (existingLike) {
                // unlike
                await supabase.from('comment_likes').delete().eq('id', existingLike.id);
                await supabase.rpc('decrement_likes', { row_id: id });
                await supabase.from('comments').update({ likedByUser: false }).eq('id', id).eq('userId', userId);
                // manual:
                // await supabase.from('comments').update({ likesCount: current - 1 }).eq('id', commentId);

                return res.status(200).json({ liked: false });
            } else {
                // like
                await supabase.from('comment_likes').insert([{ commentId: id, userId }]);
                await supabase.from('comments').update({ likedByUser: true }).eq('id', id).eq('userId', userId);
                await supabase.rpc('increment_likes', { row_id: id });

                return res.status(200).json({ liked: true });
            }
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    if (req.method === 'DELETE') {
        const { id, userId } = req.query;

        if (!id || !userId) {
            return res.status(400).json({ error: 'Comment ID and User ID are required' });
        }

        await supabase
            .from('comment_likes')
            .delete()
            .eq('commentId', id)

        const { error } = await supabase
            .from('comments')
            .delete()
            .eq('id', id)

        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ message: 'Comment deleted successfully' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
}