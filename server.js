require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Papago Translation API function
async function translateText(text, sourceLang = 'auto', targetLang = 'en') {
    try {
        const response = await axios.post(
            'https://naveropenapi.apigw.ntruss.com/nmt/v1/translation',
            {
                source: sourceLang,
                target: targetLang,
                text: text,
            },
            {
                headers: {
                    'X-NCP-APIGW-API-KEY-ID': process.env.PAPAGO_CLIENT_ID,
                    'X-NCP-APIGW-API-KEY': process.env.PAPAGO_CLIENT_SECRET,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data.message.result.translatedText;
    } catch (error) {
        console.error('Translation error:', error.response?.data || error.message);
        throw new Error('Failed to translate text');
    }
}

// DALL-E API 호출 엔드포인트
app.post('/generate-image', async (req, res) => {
    const prompt = req.body.prompt;
    try {
        // Translate the prompt
        const translatedPrompt = await translateText(prompt);

        // Generate image with the translated prompt
        const response = await axios.post(
            'https://api.openai.com/v1/images/generations',
            {
                prompt: translatedPrompt,
                n: 1,
                size: '256x256',
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        res.json({ imageUrl: response.data.data[0].url });
    } catch (error) {
        console.error('Error generating image:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to generate image' });
    }
});

// Proxy endpoint for CORS
app.get('/proxy-image', async (req, res) => {
    const imageUrl = req.query.url;
    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        res.set('Content-Type', response.headers['content-type']);
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).send('Failed to fetch image');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
