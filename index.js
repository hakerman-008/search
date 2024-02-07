const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/search', async (req, res) => {
    try {
        const query = req.query.query;
        const response = await axios.post('https://ai-space-search-images-prompts.p.rapidapi.com/search', {
            query: query,
            limit: '150',
            page: '0'
        }, {
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': 'b38444b5b7mshc6ce6bcd5c9e446p154fa1jsn7bbcfb025b3b',
                'X-RapidAPI-Host': 'ai-space-search-images-prompts.p.rapidapi.com'
            }
        });
        const images = response.data.map(image => image.image_url); 
        res.json(images);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
