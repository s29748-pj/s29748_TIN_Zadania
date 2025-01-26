const API_URL = "http://szuflandia.pjwstk.edu.pl/~ppisarski/zad8/dane.php";

let previousStockData = {};

async function fetchStockData() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data);

        if (data && data.stock && typeof data.stock === 'object') {
            updateStockTable(data.stock);
        } else {
            console.error("Stock data is missing or in the wrong format:", data.stock);
        }

        if (data && data.news) {
            updateNewsRotator(data.news);
        } else {
            console.error("News data is missing or in the wrong format:", data.news);
        }
    } catch (error) {
        console.error("Error fetching stock data:", error);
    }
}


function updateStockTable(stocks) {
    if (!stocks || typeof stocks !== 'object') {
        console.error("Invalid stocks data:", stocks);
        return;
    }

    const tableBody = document.querySelector("#stock-table tbody");
    tableBody.innerHTML = "";

    Object.keys(stocks).forEach(company => {
        const price = stocks[company];

        const previousPrice = previousStockData[company] || price;
        const changeClass = price > previousPrice ? "up" 
                           : price < previousPrice ? "down" 
                           : "same";
        const changeSymbol = price > previousPrice ? "↑↑UP↑↑" 
                           : price < previousPrice ? "↓↓DOWN↓↓" 
                           : "--SAME--";

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${company}</td>
            <td>${price.toFixed(2)}</td>
            <td class="${changeClass}">${changeSymbol}</td>
        `;

        tableBody.appendChild(row);
        previousStockData[company] = price;
    });
}


let newsQueue = [];

function updateNewsRotator(news) {
    if (!news || typeof news !== 'string') {
        console.error("Invalid news data:", news);
        return;
    }

    const newsList = document.querySelector("#news-list");
    newsQueue = [...newsQueue.slice(-2), news]; 

    newsList.innerHTML = "";
    newsQueue.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item;
        li.style.opacity = (index + 1) / 3; 
        newsList.appendChild(li);
    });
}

setInterval(fetchStockData, 5000);
fetchStockData();
