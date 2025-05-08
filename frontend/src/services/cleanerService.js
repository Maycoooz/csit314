// src/services/cleanerService.js

export async function getAvailableCategories() {
    const response = await fetch("http://localhost:8000/cleaner/createService", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch categories");
    }

    return await response.json(); // Should be List[AvailableCategories]
}

export async function createService(data) {
    const response = await fetch("http://localhost:8000/cleaner/createService", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to create service");
    }

    return result;
}

//-------------------------------------------------------------------------------------------------------------

export async function getCleanerServices(data) {
    const response = await fetch("http://localhost:8000/cleaner/viewAllServices", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to fetch services");
    }

    return result;
}
