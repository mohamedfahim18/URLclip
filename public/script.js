const input = document.getElementById("input");
const button = document.getElementById("generate");

const linkResult = document.getElementById("linkResult");
const qrResult = document.getElementById("qrResult");

const aliasInput = document.getElementById("aliasInput");
const passwordInput = document.getElementById("passwordInput");

button.addEventListener("click", () => {
    fetch("/shorten", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            url: input.value,
            customAlias: aliasInput.value.trim(),
            password: passwordInput.value.trim()
        })
    })
        .then(async (res) => {

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error);
            }

            return data;
        })

        .then((data) => {

            linkResult.innerHTML = `<a href="${data.shortUrl}" target="_blank" class="short-link">${data.shortUrl}</a>`;

            qrResult.innerHTML = `<img src="${data.qrCode}" class="qr-code">`;

        })

        .catch((err) => {

            alert(err.message);

        });
});

[input, aliasInput, passwordInput].forEach(element => {
    element.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            button.click();
        }
    });
});
