import express from 'express';
import QRCode from 'qrcode';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

// MIDDLEWARE TO PARSE JSON AND SERVE STATIC FILES
app.use(bodyParser.json());
app.use(express.static('public'));

// API ENDPOINT TO GENERATE QR CODE
app.post('/generate', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text is required to generate QR code.' });
    }

    try {
        // GENERATE THE QR CODE
        const qrCodeDataURL = await QRCode.toDataURL(text);
        res.status(200).json({ qrCodeDataURL });
    } catch (err) {
        res.status(500).json({ error: 'Error generating QR Code.' });
    }
});

// START THE SERVER
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING AT: http://localhost:${PORT}`);
});