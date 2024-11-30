// ADD CLICK EVENT TO GENERATE BUTTON
document.getElementById('generate-btn').addEventListener('click', async () => {
    // GET INPUT TEXT
    const text = document.getElementById('qr-text').value;

    // SHOW ALERT IF INPUT IS EMPTY
    if (!text) {
        alert('Please Enter URL To Generate QR Code!');
        return;
    }

    try {
        // SEND TEXT TO BACKEND
        const response = await fetch('/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });

        // DISPLAY QR CODE ON SUCCESS
        if (response.ok) {
            const { qrCodeDataURL } = await response.json();
            document.getElementById('qr-code').innerHTML = `
                <img src="${qrCodeDataURL}" alt="QR Code" />
            `;
        } else {
            // SHOW ALERT FOR BACKEND ERROR
            alert('Error Generating QR Code. Please Try Again!');
        }
    } catch (err) {
        // SHOW ALERT FOR NETWORK ERROR
        alert('Something Went Wrong. Please Try Again Later!');
    }
});
