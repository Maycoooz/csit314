// src/services/reportService.js

const BASE_URL = "http://localhost:8000/pm";

export async function getDailyReport(date) {
    const response = await fetch(`${BASE_URL}/getDailyReport?date=${date}`);
    return await response.json();
}

//-------------------------------------------------------------------------------------------------------------

// src/services/reportService.js

export async function getWeeklyReport(start_date, end_date) {
    const response = await fetch(`${BASE_URL}/getWeeklyReport?start_date=${start_date}&end_date=${end_date}`);
    return await response.json();
}

//-------------------------------------------------------------------------------------------------------------

export async function getMonthlyReport(year, month) {
    const response = await fetch(`http://localhost:8000/pm/getMonthlyReport?year=${year}&month=${month}`);
    return await response.json();
}
