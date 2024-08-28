    async function fetchStockData(stockSymbol) {
        const apiKey = '9GZA6DNDIXXMSPTC';  // Replace with your API key
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=1min&apikey=${apiKey}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            const latestData = data['Time Series (1min)'];
            const latestTime = Object.keys(latestData)[0];
            const stockPrice = latestData[latestTime]['1. open'];
            
            document.getElementById(`price-${stockSymbol}`).innerText = `$${stockPrice}`;
        } catch (error) {
            console.error('Error fetching stock data:', error);
        }
    }

    function updateStockPrices() {
        const stocks = ['AAPL', 'AMZN'];  // Add more stock symbols as needed
        stocks.forEach(stock => fetchStockData(stock));
    }

    setInterval(updateStockPrices, 60000);  // Update every 60 seconds
    window.onload = updateStockPrices;  // Initial call to fetch data
