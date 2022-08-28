
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
// const { sendPhoto } = require('./send-photo');
// const { sendMessage } = require('./send-message');

const { PORT, TELEGRAM_TOKEN, SERVER_URL } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

const setupWebhook = async () => {
    try {
        await axios.get(`${TELEGRAM_API}/setWebhook?url=${SERVER_URL}&drop_pending_updates=true`);
    } catch (error) {
        return error;
    }
}

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.get('/name', (req, res) => {
    res.send('<h1> Telegram server </h1>');
});

app.post('/', (req, res) => {
	console.log(3)
	const { message } = req.body
	const photo = message.photo;

	if(!message) {
		return res.end();
	}
	// if(message.text === '/cats') {

	// }
	if(photo && photo.length){
		console.log(1);
		// return sendPhoto(TELEGRAM_API, message);
		axios
        .post(
            `${TELEGRAM_API}/sendPhoto`,
            {
                chat_id: message.chat.id,
                photo: photo[0].file_id,
                caption: message.caption,
            }
        )
        .then(() => {
            res.end('ok');
        })
        .catch((err) => {
            res.end('Photo does not send:' + err);
        });
	}
	console.log(2);
	// return sendMessage(TELEGRAM_API, message);
	axios
        .post(
            `${TELEGRAM_API}/sendMessage`,
            {
                chat_id: message.chat.id,
                text: message.text,
            }
        )
        .then(() => {
            res.end('ok');
        })
        .catch((err) => {
            res.end('When you send message an error has occurred:' + err);
        });
});

app.listen(PORT, async () => {
	try {
        console.log(`Telegram app listening on port: ${PORT}`);
        await setupWebhook();
    } catch (error) {
        console.log(error.message);
    }
});
