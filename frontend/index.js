class LoginHandler {
    constructor(formId, responseId) {
        this.form = document.getElementById(formId);
        this.msg = document.getElementById(responseId);
        this.init();
    }

    init() {
        this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();

        const credentials = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        };

        try {
            const response = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Login failed");
            }

            this.showMessage(result.message, true);
        } catch (error) {
            this.showMessage(error.message, false);
        }
    }

    showMessage(message, success) {
        this.msg.textContent = message;
        this.msg.style.color = success ? "green" : "red";
    }
}

// Initialize login handler when page is ready
document.addEventListener("DOMContentLoaded", () => {
    new LoginHandler("loginForm", "responseMessage");
});
