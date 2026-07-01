const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// Mock flight data - realistic data for demo
const mockFlights = {
  'JFKLAX': [
    {
      id: '1',
      price: { total: '285', currency: 'USD' },
      validatingAirlineCodes: ['AA'],
      itineraries: [{
        duration: 'PT5H30M',
        segments: [{
          departure: { iataCode: 'JFK', at: '2026-08-15T08:00:00' },
          arrival: { iataCode: 'LAX', at: '2026-08-15T11:30:00' }
        }]
      }]
    },
    {
      id: '2',
      price: { total: '320', currency: 'USD' },
      validatingAirlineCodes: ['UA'],
      itineraries: [{
        duration: 'PT5H45M',
        segments: [{
          departure: { iataCode: 'JFK', at: '2026-08-15T09:15:00' },
          arrival: { iataCode: 'LAX', at: '2026-08-15T13:00:00' }
        }]
      }]
    },
    {
      id: '3',
      price: { total: '295', currency: 'USD' },
      validatingAirlineCodes: ['DL'],
      itineraries: [{
        duration: 'PT6H00M',
        segments: [{
          departure: { iataCode: 'JFK', at: '2026-08-15T10:30:00' },
          arrival: { iataCode: 'LAX', at: '2026-08-15T14:30:00' }
        }]
      }]
    },
    {
      id: '4',
      price: { total: '410', currency: 'USD' },
      validatingAirlineCodes: ['SW'],
      itineraries: [{
        duration: 'PT5H20M',
        segments: [
          {
            departure: { iataCode: 'JFK', at: '2026-08-15T07:00:00' },
            arrival: { iataCode: 'DEN', at: '2026-08-15T09:30:00' }
          },
          {
            departure: { iataCode: 'DEN', at: '2026-08-15T11:00:00' },
            arrival: { iataCode: 'LAX', at: '2026-08-15T12:00:00' }
          }
        ]
      }]
    },
    {
      id: '5',
      price: { total: '350', currency: 'USD' },
      validatingAirlineCodes: ['B6'],
      itineraries: [{
        duration: 'PT5H40M',
        segments: [{
          departure: { iataCode: 'JFK', at: '2026-08-15T11:45:00' },
          arrival: { iataCode: 'LAX', at: '2026-08-15T15:25:00' }
        }]
      }]
    },
    {
      id: '6',
      price: { total: '455', currency: 'USD' },
      validatingAirlineCodes: ['BA'],
      itineraries: [{
        duration: 'PT5H50M',
        segments: [{
          departure: { iataCode: 'JFK', at: '2026-08-15T13:00:00' },
          arrival: { iataCode: 'LAX', at: '2026-08-15T16:50:00' }
        }]
      }]
    },
    {
      id: '7',
      price: { total: '305', currency: 'USD' },
      validatingAirlineCodes: ['NK'],
      itineraries: [{
        duration: 'PT5H35M',
        segments: [{
          departure: { iataCode: 'JFK', at: '2026-08-15T14:20:00' },
          arrival: { iataCode: 'LAX', at: '2026-08-15T17:55:00' }
        }]
      }]
    }
  ],
  'LHRCDG': [
    {
      id: '1',
      price: { total: '95', currency: 'USD' },
      validatingAirlineCodes: ['BA'],
      itineraries: [{
        duration: 'PT1H15M',
        segments: [{
          departure: { iataCode: 'LHR', at: '2026-08-15T08:00:00' },
          arrival: { iataCode: 'CDG', at: '2026-08-15T09:15:00' }
        }]
      }]
    },
    {
      id: '2',
      price: { total: '120', currency: 'USD' },
      validatingAirlineCodes: ['AF'],
      itineraries: [{
        duration: 'PT1H20M',
        segments: [{
          departure: { iataCode: 'LHR', at: '2026-08-15T10:30:00' },
          arrival: { iataCode: 'CDG', at: '2026-08-15T11:50:00' }
        }]
      }]
    },
    {
      id: '3',
      price: { total: '110', currency: 'USD' },
      validatingAirlineCodes: ['U2'],
      itineraries: [{
        duration: 'PT1H25M',
        segments: [{
          departure: { iataCode: 'LHR', at: '2026-08-15T12:00:00' },
          arrival: { iataCode: 'CDG', at: '2026-08-15T13:25:00' }
        }]
      }]
    }
  ],
  'NRTICN': [
    {
      id: '1',
      price: { total: '450', currency: 'USD' },
      validatingAirlineCodes: ['NH'],
      itineraries: [{
        duration: 'PT11H30M',
        segments: [{
          departure: { iataCode: 'NRT', at: '2026-08-15T14:00:00' },
          arrival: { iataCode: 'ICN', at: '2026-08-16T01:30:00' }
        }]
      }]
    },
    {
      id: '2',
      price: { total: '420', currency: 'USD' },
      validatingAirlineCodes: ['OZ'],
      itineraries: [{
        duration: 'PT11H45M',
        segments: [{
          departure: { iataCode: 'NRT', at: '2026-08-15T16:30:00' },
          arrival: { iataCode: 'ICN', at: '2026-08-16T04:15:00' }
        }]
      }]
    },
    {
      id: '3',
      price: { total: '480', currency: 'USD' },
      validatingAirlineCodes: ['KE'],
      itineraries: [{
        duration: 'PT11H20M',
        segments: [{
          departure: { iataCode: 'NRT', at: '2026-08-15T18:00:00' },
          arrival: { iataCode: 'ICN', at: '2026-08-16T05:20:00' }
        }]
      }]
    }
  ]
};

// Search flights endpoint
app.post('/api/search', async (req, res) => {
    const { from, to, date } = req.body;
    
    if (!from || !to || !date) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    try {
        // Create key for mock data lookup
        const routeKey = from + to;
        
        // Get mock flights for this route
        const flights = mockFlights[routeKey] || [];
        
        if (flights.length === 0) {
            return res.json({
                success: true,
                count: 0,
                data: [],
                message: `No flights found for ${from} → ${to}. Try: JFK→LAX, LHR→CDG, or NRT→ICN`
            });
        }
        
        // Sort by price (cheapest first)
        flights.sort((a, b) => 
            parseFloat(a.price.total) - parseFloat(b.price.total)
        );
        
        res.json({
            success: true,
            count: flights.length,
            data: flights,
            note: 'Demo data - for portfolio demonstration'
        });
        
    } catch (error) {
        console.error('Search error:', error.message);
        res.status(500).json({ 
            error: error.message 
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Flight Tracker API running with demo data' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✈️  Flight Tracker running on port ${PORT}`);
    console.log(`Demo data routes: JFK→LAX, LHR→CDG, NRT→ICN`);
});
