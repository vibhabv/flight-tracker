const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

let accessToken = null;
let tokenExpiry = null;

async function getToken() {
    const now = Date.now();
    
    if (accessToken && tokenExpiry && now < tokenExpiry) {
        return accessToken;
    }
    
    try {
        const response = await axios.post(
            'https://test.api.amadeus.com/v1/security/oauth2/token',
            null,
            {
                params: {
                    grant_type: 'client_credentials',
                    client_id: process.env.AMADEUS_CLIENT_ID,
                    client_secret: process.env.AMADEUS_CLIENT_SECRET
                }
            }
        );
        
        accessToken = response.data.access_token;
        tokenExpiry = now + (response.data.expires_in - 100) * 1000;
        
        return accessToken;
    } catch (error) {
        console.error('Token error:', error.message);
        throw new Error('Failed to authenticate with Amadeus API');
    }
}

app.post('/api/search', async (req, res) => {
    const { from, to, date, returnDate } = req.body;
    
    if (!from || !to || !date) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    try {
        const token = await getToken();
        
        let url = 'https://test.api.amadeus.com/v2/shopping/flight-offers?' +
            `originLocationCode=${from}&` +
            `destinationLocationCode=${to}&` +
            `departureDate=${date}&` +
            `adults=1`;
        
        if (returnDate) {
            url += `&returnDate=${returnDate}`;
        }
        
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const flights = response.data.data || [];
        
        flights.sort((a, b) => 
            parseFloat(a.price.total) - parseFloat(b.price.total)
        );
        
        res.json({
            success: true,
            count: flights.length,
            data: flights.slice(0, 20)
        });
        
    } catch (error) {
        console.error('Search error:', error.message);
        
        if (error.response?.status === 401) {
            accessToken = null;
            return res.status(500).json({ 
                error: 'Authentication failed. Check API credentials.' 
            });
        }
        
        res.status(500).json({ 
            error: error.response?.data?.errors?.[0]?.detail || error.message 
        });
    }
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✈️  Flight Tracker running on port ${PORT}`);
});
