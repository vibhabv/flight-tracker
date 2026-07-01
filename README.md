# ✈️ Flight Price Tracker

Real-time flight price search tool built with Node.js.

**Live Demo:** [Coming soon after deployment]

## Features

✅ Search flights by airport code and date
✅ Realistic mock flight data
✅ Highlights cheapest option automatically
✅ Shows flight duration, stops, times
✅ Mobile responsive
✅ Clean, modern UI

## Demo Routes (Try These!)

```
From → To
JFK  → LAX  (New York to Los Angeles)
LHR  → CDG  (London to Paris)
NRT  → ICN  (Tokyo to Seoul)
```

## Problem & Solution

**Problem:** Users overwhelmed by Kayak's 15+ filters. Just want: "Show me the cheapest"

**Solution:** Built tool focusing on simplicity:
- Speed: 30 seconds to get answer
- Simplicity: 3 inputs only
- Clarity: Cheapest highlighted automatically

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** Vanilla HTML/CSS/JavaScript
- **Deployment:** Vercel
- **Data:** Mock data (for demo/portfolio)

## How It Works

```
User enters: JFK → LAX on Aug 15
        ↓
Express server receives request
        ↓
Returns mock flight data (sorted by price)
        ↓
Frontend displays results
```

## Local Development

### Prerequisites
- Node.js installed
- That's it! No API keys needed.

### Setup

```bash
git clone https://github.com/yourname/flight-tracker.git
cd flight-tracker

npm install
npm start
```

Visit: http://localhost:3000

## Testing

Try these routes:
- **JFK → LAX** (7 flights, $285-$455)
- **LHR → CDG** (3 flights, $95-$120)
- **NRT → ICN** (3 flights, $420-$480)

Try other codes and you'll see: "No flights found" message

## Deployment

1. Push code to GitHub
2. Connect to Vercel
3. No environment variables needed!
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
3. **Mock data is powerful** - Can showcase ideas without APIs
4. **Business model matters** - Affiliate revenue > ads for travel

## About the Mock Data

This is a **portfolio demo project**. The flight data is:
- ✅ Realistic (real airline codes, real prices)
- ✅ Fully functional (all features work)
- ✅ Demonstration purposes (not real bookings)

To integrate real flight data, connect to:
- Amadeus API
- Skyscanner API
- Google Flights API

## Future Enhancements

- [ ] Connect to real flight API
- [ ] Add price tracking (save to database)
- [ ] Add price alerts (email when drops)
- [ ] Add user accounts
- [ ] Add affiliate links
- [ ] Build mobile app

## License

MIT
