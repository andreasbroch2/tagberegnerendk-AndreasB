const mongoose = require("mongoose");

// Opret forbindelse til MongoDB
mongoose
    .connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Forbindelse til MongoDB etableret");
    })
    .catch((error) => {
        console.error("Fejl ved etablering af forbindelse til MongoDB:", error);
    });

module.exports = mongoose;
