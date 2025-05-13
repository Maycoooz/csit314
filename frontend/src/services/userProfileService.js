const BASE_URL = "http://localhost:8000/admin";

export async function createUserProfile(data) {
    const response = await fetch(`${BASE_URL}/createUserProfile`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || "Failed to create user profile");
    }
    return result;
}

//-------------------------------------------------------------------------------------------------------------

export async function viewAllUserProfiles() {
    const response = await fetch(`${BASE_URL}/viewAllUserProfiles`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || "Failed to retrieve user profiles");
    }
    return result;
}

//-------------------------------------------------------------------------------------------------------------

export async function searchUserProfile(role) {
    const response = await fetch(`${BASE_URL}/searchUserProfile?role=${encodeURIComponent(role)}`, {
        method: "GET",
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || "Search failed");
    }
    return result;
}

//-------------------------------------------------------------------------------------------------------------

export async function suspendUserProfile(role) {
    const response = await fetch(`${BASE_URL}/suspendUserProfile`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || "Suspension failed");
    }
    return result;
}

//-------------------------------------------------------------------------------------------------------------

export async function updateUserProfile(data) {
    const response = await fetch(`${BASE_URL}/updateUserProfile`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // expects: target_role, updated_role, updated_description
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || "Update failed");
    }
    return result;
}
