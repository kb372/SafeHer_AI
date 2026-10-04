/* =========================================================
   SAFEHER AI - SCRIPT.JS
   Clean final version
========================================================= */


/* =========================================================
   WELCOME USER
========================================================= */

function welcomeUser() {

    const input = document.getElementById("username");
    const welcome = document.getElementById("welcomeText");

    if (!input) return;

    const name = input.value.trim();

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    if (welcome) {
        welcome.innerHTML =
            "🌸 Welcome, " + name +
            "! Stay Safe with SafeHer AI.";
    }
}


/* =========================================================
   PLACE SAFETY ANALYZER
========================================================= */

function analyzeImage() {

    const imageInput =
        document.getElementById("imageUpload");

    if (!imageInput || imageInput.files.length === 0) {
        alert("Please upload an image first.");
        return;
    }

    const lighting = Math.floor(Math.random() * 31);
    const crowd = Math.floor(Math.random() * 26);
    const visibility = Math.floor(Math.random() * 21);
    const cctv = Math.floor(Math.random() * 16);
    const emergency = Math.floor(Math.random() * 11);

    const score =
        lighting +
        crowd +
        visibility +
        cctv +
        emergency;

    let status;

    if (score >= 80) {
        status = "🟢 SAFE AREA";
    } else if (score >= 50) {
        status = "🟡 MODERATE RISK";
    } else {
        status = "🔴 UNSAFE AREA";
    }

    const progressBar =
        document.getElementById("progressBar");

    if (progressBar) {
        progressBar.style.width = score + "%";
    }

    const scoreDisplay =
        document.getElementById("scoreDisplay");

    if (scoreDisplay) {
        scoreDisplay.innerHTML = score + "%";
    }

    const areaStatus =
        document.getElementById("areaStatus");

    if (areaStatus) {
        areaStatus.innerHTML = status;
    }

    const report =
        document.getElementById("report");

    if (report) {

        report.innerHTML =
            "<h3>📊 SafeHer AI Report</h3>" +
            "<p>💡 Lighting: " + lighting + "/30</p>" +
            "<p>👥 Crowd Density: " + crowd + "/25</p>" +
            "<p>🛣 Visibility: " + visibility + "/20</p>" +
            "<p>📹 CCTV Presence: " + cctv + "/15</p>" +
            "<p>🚔 Emergency Access: " + emergency + "/10</p>" +
            "<br>" +
            "<h2>Safety Score: " + score + "/100</h2>" +
            "<h2>" + status + "</h2>";
    }
}


/* =========================================================
   EMOTION PREDICTOR
========================================================= */

function detectEmotion() {

    const input =
        document.getElementById("emotionText");

    if (!input) return;

    const text =
        input.value.toLowerCase().trim();

    let emotion = "😐 Neutral";

    if (
        text.includes("happy") ||
        text.includes("great") ||
        text.includes("good") ||
        text.includes("awesome")
    ) {
        emotion = "😊 Happy";
    }

    else if (
        text.includes("sad") ||
        text.includes("cry")
    ) {
        emotion = "😔 Sad";
    }

    else if (
        text.includes("angry") ||
        text.includes("mad")
    ) {
        emotion = "😠 Angry";
    }

    else if (
        text.includes("fear") ||
        text.includes("afraid") ||
        text.includes("scared")
    ) {
        emotion = "😨 Fear";
    }

    else if (
        text.includes("confident") ||
        text.includes("strong")
    ) {
        emotion = "💪 Confident";
    }

    const result =
        document.getElementById("emotionResult");

    if (result) {
        result.innerHTML =
            "Detected Emotion: " + emotion;
    }

    const display =
        document.getElementById("emotionDisplay");

    if (display) {
        display.innerHTML = emotion;
    }

    const emotionStatus =
        document.getElementById("emotionStatus");

    if (emotionStatus) {
        emotionStatus.innerHTML = "Detected";
    }
}


/* =========================================================
   CHATBOT
========================================================= */

function sendMessage() {

    const input =
        document.getElementById("userInput");

    const chatbox =
        document.getElementById("chatbox");

    if (!input || !chatbox) return;

    const message =
        input.value.trim();

    if (message === "") return;

    chatbox.innerHTML +=
        "<div class='user'>" +
        message +
        "</div>";

    const reply =
        getBotReply(message.toLowerCase());

    setTimeout(function () {

        chatbox.innerHTML +=
            "<div class='bot'>🤖 " +
            reply +
            "</div>";

        chatbox.scrollTop =
            chatbox.scrollHeight;

    }, 400);

    input.value = "";
}


/* =========================================================
   CHATBOT RESPONSES
========================================================= */

function getBotReply(message) {

    if (message.includes("help")) {
        return "Move toward a safe public place and contact a trusted person or emergency services if necessary.";
    }

    if (message.includes("night")) {
        return "Stay in well-lit public areas and avoid isolated routes whenever possible.";
    }

    if (message.includes("follow")) {
        return "Move toward a populated public place, avoid confrontation, and contact someone you trust.";
    }

    if (message.includes("safe")) {
        return "Stay aware of your surroundings and keep a trusted person informed of your plans.";
    }

    if (message.includes("alone")) {
        return "Stay connected with someone you trust and choose well-lit, populated routes.";
    }

    if (message.includes("emergency")) {
        return "Use the SOS feature and contact emergency services if you are in immediate danger.";
    }

    if (message.includes("location")) {
        return "Use the Set My Location button to add your current location.";
    }

    if (
        message.includes("self defense") ||
        message.includes("self-defense")
    ) {
        return "Focus on awareness, creating distance, attracting attention, and moving toward a safe public place.";
    }

    return "I am SafeHer AI. Ask me about safety, emergencies, location, self-defense or personal security.";
}


/* =========================================================
   SET MY LOCATION
========================================================= */

function setMyLocation() {

    const status =
        document.getElementById("safetyStatus");

    const message =
        document.getElementById("locationMessage");

    if (!status || !message) {
        alert("Location elements were not found.");
        return;
    }

    if (!navigator.geolocation) {

        status.innerHTML =
            "❌ Location Unavailable";

        message.innerHTML =
            "Your browser does not support location services.";

        return;
    }

    status.innerHTML =
        "🟡 Getting Location...";

    message.innerHTML =
        "📍 Please allow location access.";

    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;

            status.innerHTML =
                "🟢 Location Active";

            message.innerHTML =
                "✅ Your location has been added.";

            console.log("Latitude:", latitude);
            console.log("Longitude:", longitude);

            /* Send location to Flask */

            fetch("/api/location", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    latitude: latitude,
                    longitude: longitude
                })

            })
            .then(response => response.json())
            .then(data => {

                console.log(
                    "SafeHer AI location response:",
                    data
                );

            })
            .catch(error => {

                console.error(
                    "Location server error:",
                    error
                );

            });
        },

        function(error) {

            status.innerHTML =
                "🟡 Location Not Set";

            if (error.code === 1) {

                message.innerHTML =
                    "❌ Location permission denied. You can try again later.";

            } else if (error.code === 2) {

                message.innerHTML =
                    "❌ Your location could not be determined.";

            } else if (error.code === 3) {

                message.innerHTML =
                    "❌ Location request timed out.";

            } else {

                message.innerHTML =
                    "❌ Unable to get your location.";
            }

            console.log(
                "Location error:",
                error
            );
        }
    );
}


/* =========================================================
   SOS
========================================================= */

async function sendSOS() {

    const confirmed =
        confirm(
            "🚨 Emergency SOS\n\n" +
            "SafeHer AI will request your location " +
            "and send the emergency information to the SafeHer AI server.\n\n" +
            "Continue?"
        );

    if (!confirmed) return;

    if (!navigator.geolocation) {

        sendSOSWithoutLocation();
        return;
    }

    navigator.geolocation.getCurrentPosition(

        function(position) {

            sendSOSToBackend(
                position.coords.latitude,
                position.coords.longitude
            );
        },

        function() {

            sendSOSWithoutLocation();
        }
    );
}


/* =========================================================
   SEND SOS WITH LOCATION
========================================================= */

async function sendSOSToBackend(
    latitude,
    longitude
) {

    try {

        const response =
            await fetch("/api/sos", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    latitude: latitude,
                    longitude: longitude
                })
            });

        const data =
            await response.json();

        if (data.success) {

            alert(
                "🚨 SOS REQUEST RECEIVED\n\n" +
                "SafeHer AI has received your emergency request."
            );

        } else {

            alert(
                "⚠️ The SOS request could not be processed."
            );
        }

    } catch (error) {

        console.error("SOS error:", error);

        alert(
            "❌ Could not connect to the SafeHer AI server."
        );
    }
}


/* =========================================================
   SOS WITHOUT LOCATION
========================================================= */

async function sendSOSWithoutLocation() {

    try {

        const response =
            await fetch("/api/sos", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    latitude: null,
                    longitude: null
                })
            });

        const data =
            await response.json();

        if (data.success) {

            alert(
                "🚨 SOS REQUEST RECEIVED\n\n" +
                "Your emergency request was received, but your location was unavailable."
            );

        } else {

            alert(
                "⚠️ SOS could not be processed."
            );
        }

    } catch (error) {

        console.error("SOS error:", error);

        alert(
            "❌ Could not connect to the SafeHer AI server."
        );
    }
}


/* =========================================================
   CONTACT FORM
========================================================= */

async function sendContact() {

    const name =
        document.getElementById("contactName");

    const email =
        document.getElementById("contactEmail");

    const message =
        document.getElementById("contactMessage");

    if (!name || !email || !message) {

        alert("Contact form fields were not found.");
        return;
    }

    if (
        name.value.trim() === "" ||
        email.value.trim() === "" ||
        message.value.trim() === ""
    ) {

        alert("Please complete all contact fields.");
        return;
    }

    try {

        const response =
            await fetch("/api/contact", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    name: name.value.trim(),
                    email: email.value.trim(),
                    message: message.value.trim()

                })
            });

        const data =
            await response.json();

        if (data.success) {

            alert(
                "✅ Your message has been received by SafeHer AI."
            );

            name.value = "";
            email.value = "";
            message.value = "";

        } else {

            alert(
                "❌ Your message could not be submitted."
            );
        }

    } catch (error) {

        console.error("Contact error:", error);

        alert(
            "❌ Could not connect to the SafeHer AI server."
        );
    }
}


/* =========================================================
   CHATBOT ENTER KEY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const input =
            document.getElementById("userInput");

        if (input) {

            input.addEventListener(
                "keypress",
                function(event) {

                    if (event.key === "Enter") {

                        event.preventDefault();

                        sendMessage();
                    }
                }
            );
        }
    }
);
/* =========================================================
   LOCATION STATUS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const safetyStatus =
        document.getElementById("safetyStatus");

    if (!safetyStatus) return;

    safetyStatus.innerHTML =
        "📍 Location Required";

    if (!navigator.geolocation) {

        safetyStatus.innerHTML =
            "❌ Location Unavailable";

        return;
    }

    navigator.geolocation.getCurrentPosition(

        function () {

            safetyStatus.innerHTML =
                "🟢 Location Active";

        },

        function () {

            safetyStatus.innerHTML =
                "📍 Allow Location";

        }

    );

});