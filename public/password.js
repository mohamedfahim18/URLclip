const passwordInput = document.getElementById("passwordInput");
const unlockBtn = document.getElementById("unlockBtn");
const errorMessage = document.getElementById("errorMessage");

unlockBtn.addEventListener("click", () => {

    const password = passwordInput.value;
    if (password.trim() === "") {
        errorMessage.textContent = "Please enter the password.";
        return;
    }

    fetch(`/verify/${shortCode}`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            password
        })

    })

        .then(async (res) => {

            let data = {};

            try {
                data = await res.json();
            } catch {
                throw new Error("Server returned an invalid response.");
            }

            if (!res.ok) {
                throw new Error(data.error || "Verification failed");
            }

            return data;
        })

        .then((data) => {

            window.location.href = data.redirectUrl;

        })

        .catch((err) => {

            errorMessage.textContent = err.message;
            passwordInput.value = "";
            passwordInput.focus();

        });

});

const params = new URLSearchParams(window.location.search);
const shortCode = params.get("code");

console.log(shortCode);

passwordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        unlockBtn.click();
    }
});