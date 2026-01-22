
const fs = require('fs');

const API_KEY = '55fcc2641244e85b1df8327c71bea3f265ababdb';

async function fetchData() {
    const headers = {
        'X-API-KEY': API_KEY,
        'Content-Type': 'application/json'
    };

    const fetchCategory = async (query) => {
        try {
            const res = await fetch('https://google.serper.dev/shopping', {
                method: 'POST',
                headers,
                body: JSON.stringify({ q: query, gl: 'us', hl: 'en', num: 6 })
            });
            const data = await res.json();
            return data.shopping || [];
        } catch (e) {
            console.error(e);
            return [];
        }
    };

    const shoes = await fetchCategory('Dior Shoes');
    const scarves = await fetchCategory('Dior Scarf');

    const result = { shoes, scarves };
    fs.writeFileSync('real_data.json', JSON.stringify(result, null, 2));
    console.log('Data saved to real_data.json');
}

fetchData();
