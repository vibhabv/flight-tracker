# ✈️ Flight Price Tracker

Real-time flight price search tool built with Node.js and Amadeus API.

**Live Demo:** [Coming soon after deployment]

## Features

✅ Search flights by airport code and date
✅ Real prices from 500+ airlines worldwide
✅ Highlights cheapest option automatically
✅ Shows flight duration, stops, times
✅ Mobile responsive
✅ Clean, modern UI

## Problem & Solution

**Problem:** Users overwhelmed by Kayak's 15+ filters. Just want: "Show me the cheapest"

**Solution:** Built tool focusing on simplicity:
- Speed: 30 seconds to get answer
- Simplicity: 3 inputs only
- Clarity: Cheapest highlighted automatically

## Tech Stack

- **Backend:** Node.js, Express.js
- **API:** Amadeus Flight Search API
- **Frontend:** Vanilla HTML/CSS/JavaScript
- **Deployment:** Vercel

## How It Works

```
User enters: JFK → LAX on Aug 15
        ↓
Express server receives request
        ↓
Gets Amadeus API token
        ↓
Calls Amadeus Flight Search API
        ↓
Returns 20 cheapest flights
        ↓
Frontend displays sorted results
```

## Local Development

### Prerequisites
- Node.js installed
- Amadeus API credentials (free at https://developers.amadeus.com)

### Setup

```bash
git clone https://github.com/yourname/flight-tracker.git
cd flight-tracker

npm install

# Create .env file
echo "AMADEUS_CLIENT_ID=your-id" > .env
echo "AMADEUS_CLIENT_SECRET=your-secret" >> .env

npm start
```

Visit: http://localhost:3000

## Testing

Try:
- JFK (New York) → LAX (Los Angeles)
- LHR (London) → CDG (Paris)
- NRT (Tokyo) → ICN (Seoul)

## Deployment

1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy ✅

## Market Opportunity

- **TAM:** 60M flights/year (US)
- **User:** Price-conscious travelers
- **Monetization:** Affiliate revenue ($10-50 per booking)
- **Competitive Edge:** Simplicity vs Kayak complexity

## PM Learning

This project taught me:
1. **Constraints drive innovation** - Removing features > adding features
2. **Focus > Features** - Serve one user well vs everyone poorly
3. **Business model matters** - Affiliate revenue > ads for travel

## License

MIT
