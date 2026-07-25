const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const QRCode = require("qrcode");
const bcrypt = require("bcrypt");
const dns = require("node:dns");
const { error } = require("node:console");
require("dotenv").config();

const PORT = process.env.PORT || 2000;

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dns.resolveSrv("_mongodb._tcp.cluster0.thdyvss.mongodb.net", (err, records) => {
    if (err) {
        console.error(err);
    } else {
        console.log(records);
    }
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.set("trust proxy", true);



const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortCode: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        default: null
    }
});

const Url = mongoose.model("Url", urlSchema);


mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error(err));



function generateCode(length = 6) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";

    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return code;
}

app.get("/password.html", (req, res) => {
    console.log("Serving password page");
    res.sendFile(__dirname + "/public/password.html");
});

app.get("/:shortCode", async (req, res) => {

    const { shortCode } = req.params;

    console.log("Received:", shortCode);

    const url = await Url.findOne({ shortCode });

    if (!url) {
        console.log("Not found");
        return res.status(404).send("URL not found");
    }


    if (url.passwordHash) {
        return res.redirect(`/password.html?code=${shortCode}`);
    }


    console.log("Looking for:", shortCode);


    console.log("Found document:", url);

    res.redirect(url.originalUrl);

});


app.post("/shorten", async (req, res) => {

    try {
        const { url, customAlias, password } = req.body;

        let passwordHash = null;

        if (password && password.trim() !== "") {
            passwordHash = await bcrypt.hash(password, 10);
        }

        let shortCode;

        if (customAlias) {

            shortCode = customAlias.trim().toLowerCase();
            if (!/^[a-z0-9_-]+$/.test(shortCode)) {
                return res.status(400).json({
                    error: "Alias can only contain letters, numbers, hyphens (-), and underscores (_)."
                });
            }

            const existing = await Url.findOne({ shortCode });

            if (existing) {
                return res.status(400).json({
                    error: "This alias is already taken. Please choose another."
                });
            }

        } else {

            do {
                shortCode = generateCode();
            } while (await Url.findOne({ shortCode }));

        }

        const newUrl = new Url({
            originalUrl: url,
            shortCode,
            passwordHash
        });

        await newUrl.save();

        const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

        // Generate QR Code as Base64 Image
        const qrCode = await QRCode.toDataURL(shortUrl);

        res.json({
            originalUrl: url,
            shortCode: shortCode,
            shortUrl: shortUrl,
            qrCode: qrCode,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Something went wrong"
        });
    }
});

app.post("/verify/:shortCode", async (req, res) => {

    try {

        const { shortCode } = req.params;
        const { password } = req.body;

        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).json({
                error: "URL not found"
            });
        }

        if (!url.passwordHash) {
            return res.json({
                success: true,
                redirectUrl: url.originalUrl
            });
        }

        const match = await bcrypt.compare(password, url.passwordHash);

        if (!match) {
            return res.status(401).json({
                error: "Incorrect password"
            });
        }

        res.json({
            success: true,
            redirectUrl: url.originalUrl
        });

    } catch (err) {

        res.status(500).json({
            error: "Something went wrong"
        });

    }

});



app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});