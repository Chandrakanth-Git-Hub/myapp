const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello from myapp Docker + Jenkins Pipeline!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`myapp running on port ${PORT}`);
});
