async function searchFlights() {
    const from = document.getElementById('from').value.toUpperCase();
    const to = document.getElementById('to').value.toUpperCase();
    const date = document.getElementById('date').value;
    
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error');
    const resultsEl = document.getElementById('results');
    
    if (!from || !to || !date) {
        errorEl.textContent = '❌ Please fill in: From, To, and Departure Date';
        errorEl.classList.remove('hidden');
        return;
    }
    
    if (from.length !== 3 || to.length !== 3) {
        errorEl.textContent = '❌ Airport codes must be 3 characters';
        errorEl.classList.remove('hidden');
        return;
    }
    
    loadingEl.classList.remove('hidden');
    errorEl.classList.add('hidden');
    resultsEl.innerHTML = '';
    
    try {
        const response = await fetch('/api/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ from, to, date })
        });
        
        const result = await response.json();
        loadingEl.classList.add('hidden');
        
        if (!response.ok) {
            errorEl.textContent = '❌ ' + (result.error || 'Search failed');
            errorEl.classList.remove('hidden');
            return;
        }
        
        if (!result.data || result.data.length === 0) {
            resultsEl.innerHTML = `<div class="empty-state"><h2>No flights found</h2><p>Try different airports or dates</p></div>`;
            return;
        }
        
        const cheapestPrice = Math.min(...result.data.map(f => parseFloat(f.price.total)));
        
        resultsEl.innerHTML = result.data.map(flight => {
            const price = parseFloat(flight.price.total);
            const isCheapest = price === cheapestPrice;
            const airline = flight.validatingAirlineCodes[0] || 'Unknown';
            const segment = flight.itineraries[0].segments[0];
            const duration = formatDuration(flight.itineraries[0].duration);
            const stops = flight.itineraries[0].segments.length - 1;
            
            const departure = new Date(segment.departure.at);
            const arrival = new Date(segment.arrival.at);
            
            return `
                <div class="flight-card ${isCheapest ? 'best-price' : ''}">
                    <div class="flight-info">
                        ${isCheapest ? '<div style="color: #16a34a; font-weight: 600; margin-bottom: 8px;">★ CHEAPEST OPTION</div>' : ''}
                        <h3>${from} → ${to}</h3>
                        <p><strong>${airline}</strong></p>
                        <p>Departs: ${departure.toLocaleString('en-US', {month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'})}</p>
                        <p>Arrives: ${arrival.toLocaleString('en-US', {month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'})}</p>
                        <p>Duration: ${duration} • ${stops === 0 ? 'Direct' : stops + ' stop(s)'}</p>
                    </div>
                    <div class="flight-price">
                        <div class="price-amount">$${price.toFixed(0)}</div>
                        <p style="font-size: 12px; color: #666; margin-top: 5px;">USD</p>
                    </div>
                </div>
            `;
        }).join('');
        
    } catch (error) {
        console.error('Error:', error);
        loadingEl.classList.add('hidden');
        errorEl.textContent = '❌ Network error. Check your connection and try again.';
        errorEl.classList.remove('hidden');
    }
}

function formatDuration(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?/);
    const hours = match[1] ? match[1].replace('H', '') : '0';
    const minutes = match[2] ? match[2].replace('M', '') : '0';
    
    if (hours === '0') return `${minutes}m`;
    if (minutes === '0') return `${hours}h`;
    return `${hours}h ${minutes}m`;
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('date').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchFlights();
    });
});
