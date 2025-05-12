// src/services/serviceCategoryService.js

const BASE_URL = "http://localhost:8000/pm";

export async function createServiceCategory(new_category, new_description) {
    const response = await fetch(`${BASE_URL}/createServiceCategory`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ new_category, new_description }),
    });
    return await response.json();
}

//-------------------------------------------------------------------------------------------------------------

export async function viewAllServiceCategories() {
    const response = await fetch("http://localhost:8000/pm/viewAllServiceCategories");
    return await response.json();
}

//-------------------------------------------------------------------------------------------------------------

export async function updateServiceCategory(target_category, updated_category, updated_description) {
    const response = await fetch("http://localhost:8000/pm/updateServiceCategory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target_category, updated_category, updated_description }),
    });
    return await response.json();
}

