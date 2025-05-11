// src/services/homeOwnerService.js

const BASE_URL = "http://localhost:8000/ho";

export async function viewCleaners(service) {
    const queryParam = service ? `?service=${encodeURIComponent(service)}` : "";
    const response = await fetch(`${BASE_URL}/viewCleaners${queryParam}`);

    if (!response.ok) {
        throw new Error("Failed to fetch cleaners");
    }

    return await response.json(); // Returns a list of strings
}

//-------------------------------------------------------------------------------------------------------------

export async function viewShortlist(homeownerUsername) {
    const response = await fetch(
        `http://localhost:8000/ho/viewShortlist?homeowner_username=${encodeURIComponent(homeownerUsername)}`
    );
    if (!response.ok) throw new Error("Failed to fetch shortlist");
    return await response.json();
}

export async function filterShortlist(homeownerUsername, serviceFilter) {
    const response = await fetch(
        `http://localhost:8000/ho/filteredShortlist?homeowner_username=${encodeURIComponent(homeownerUsername)}&service_filter=${encodeURIComponent(serviceFilter)}`
    );
    if (!response.ok) throw new Error("Failed to fetch filtered shortlist");
    return await response.json();
}

//-------------------------------------------------------------------------------------------------------------

export async function getCleanerProfile(homeownerUsername, cleanerUsername) {
    const url = `http://localhost:8000/ho/viewCleanerProfile?homeowner_username=${encodeURIComponent(homeownerUsername)}&cleaner_username=${encodeURIComponent(cleanerUsername)}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch cleaner profile");
    return await response.json();
}

export async function shortlistCleaner(homeownerUsername, serviceId) {
    const response = await fetch("http://localhost:8000/ho/viewCleanerProfile/shortlistCleaner", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ homeowner_username: homeownerUsername, service_id: serviceId }),
    });

    if (!response.ok) return false;
    return await response.json(); // true or false
}

