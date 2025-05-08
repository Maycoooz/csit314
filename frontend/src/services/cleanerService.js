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

export async function searchService(data) {
    const response = await fetch("http://localhost:8000/cleaner/searchService", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // expects { target_service }
    });

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
