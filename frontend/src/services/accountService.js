//-------------------------------------------------------------------------------------------------------------

export async function createUserAccount(data) {
    const response = await fetch("http://localhost:8000/admin/createAccount", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await response.json(); // will be true or false

    if (result !== true) {
        // Manually throw an error if result is false
        throw new Error("Account creation failed. Username may already exist.");
    }

    return { message: "Account created successfully." }; // mimic expected result shape
}
//-------------------------------------------------------------------------------------------------------------

export async function getAllAccounts() {
    const response = await fetch("http://localhost:8000/admin/viewAllAccounts", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to retrieve accounts");
    }

    return result;
}

//-------------------------------------------------------------------------------------------------------------

export async function searchAccount(username) {
    const response = await fetch(
        `http://localhost:8000/admin/searchAccount?username=${encodeURIComponent(username)}`,
        {
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Account search failed");
    }

    return result;
}

//-------------------------------------------------------------------------------------------------------------

export async function suspendAccount(username) {
    const response = await fetch("http://localhost:8000/admin/suspendAccount", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to suspend account");
    }

    return result;
}

//-------------------------------------------------------------------------------------------------------------

export async function updateAccount(data) {
    const response = await fetch("http://localhost:8000/admin/updateAccount", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data), 
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to update account");
    }

    return result;
}

export async function getAllActiveUsers() {
    const response = await fetch("http://localhost:8000/admin/allUsers", {
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