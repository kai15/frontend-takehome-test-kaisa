import { supabase } from './_lib/supabase.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { base64, userId } = req.body;

    if (!base64 || !userId) {
        return res.status(400).json({ error: 'Base64 data and User ID are required' });
    }

    try {
        const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, 'base64');

        const fileName = `${userId}-${Date.now()}.jpg`;

        const { data, error } = await supabase.storage
            .from('avatar')
            .upload(fileName, buffer, {
                contentType: 'image/jpeg',
                upsert: true
            });

        if (error) throw error;

        const { data: urlData } = supabase.storage
            .from('avatar')
            .getPublicUrl(fileName);

        return res.status(200).json({ 
            message: 'Upload successful', 
            url: urlData.publicUrl 
        });

    } catch (err) {
        console.error("Upload API Error:", err);
        return res.status(500).json({ error: err.message });
    }
}