
export async function updateUserRole(data) {
    const response = await fetch("http://localhost:8000/admin/updateUserRole", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // expects { target_username, updated_role }
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to update user role");
    }

    return result; // should be a boolean
}

export async function getRoles() {
    const response = await fetch("http://localhost:8000/login", { // get current active roles from the login side
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch roles");
    }

    return await response.json(); // should be a list of roles
}

//-------------------------------------------------------------------------------------------------------------

// Get users by role
export async function getUsersByRole(data) {
    const response = await fetch("http://localhost:8000/admin/viewAllUserWithSpecifiedRole", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // expects { role }
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to fetch users by role");
    }

    return result; // List of users
}