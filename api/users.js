import { supabase } from './_lib/supabase.js';

export default async function handler(req, res) {
  const { method, body } = req;

  if (method === 'GET') {
    const { data, error } = await supabase
      .from('users')
      .select('*')

    if (error) return res.status(500).json({ error: error.message })

    return res.status(200).json(data)
  }

  if (method === 'PATCH') {
    const { userId, name, email, bio, avatar } = body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          name,
          email,
          bio,
          avatar
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;

      return res.status(200).json(data);
    } catch (err) {
      console.error("Update Profile Error:", err);
      return res.status(500).json({ error: err.message });
    }
  }
  return res.status(405).json({ message: 'Method not allowed' })
}