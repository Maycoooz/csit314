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

export async function getCleanerServices(cleaner_username) {
    if (!cleaner_username) {
        throw new Error("Username is missing.");
    }

    const response = await fetch(
        `http://localhost:8000/cleaner/viewAllServices?cleaner_username=${encodeURIComponent(cleaner_username)}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to fetch services");
    }

    return result;
}

//-------------------------------------------------------------------------------------------------------------

export async function searchService(cleaner_username, filter_service) {

    const response = await fetch(
        `http://localhost:8000/cleaner/searchService?cleaner_username=${encodeURIComponent(cleaner_username)}&filter_service=${encodeURIComponent(filter_service)}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Search failed");
    }

    return result;
}

//-------------------------------------------------------------------------------------------------------------

export async function updateService(data) {
    const response = await fetch("http://localhost:8000/cleaner/updateService", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to update service");
    }

    return result;
}

//-------------------------------------------------------------------------------------------------------------

export async function suspendService(data) {
    const response = await fetch("http://localhost:8000/cleaner/suspendService", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // expects { service_id }
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to suspend service");
    }

    return result;
}

//-------------------------------------------------------------------------------------------------------------

export async function getViewStats(cleaner_username) {
    const response = await fetch(
        `http://localhost:8000/cleaner/viewNumViews?cleaner_username=${encodeURIComponent(cleaner_username)}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch view stats");
    }

    return await response.json(); // should return a number
}

//-------------------------------------------------------------------------------------------------------------

export async function getNumShortlisted(cleanerUsername) {
    const response = await fetch(
        `http://localhost:8000/cleaner/viewNumShortlisted?cleaner_username=${encodeURIComponent(cleanerUsername)}`
    );
    if (!response.ok) {
        throw new Error("Failed to fetch shortlist count");
    }
    return response.json(); 
}

//-------------------------------------------------------------------------------------------------------------

export async function searchPastTransactions(cleanerUsername, filteredService) {
    const response = await fetch(
        `http://localhost:8000/cleaner/searchPastTransactions?cleaner_username=${encodeURIComponent(cleanerUsername)}&filtered_service=${encodeURIComponent(filteredService)}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to search past transactions");
    }

    return await response.json();
}
