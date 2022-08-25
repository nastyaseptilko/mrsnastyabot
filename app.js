
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

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
	const { message } = req.body
	const photo = message.photo;

	if(!message) {
		return res.end();
	}
	if(photo && photo.length){
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
		})
	}
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
			res.end('When you send an error has occurred:' + err);
		})
});

app.listen(PORT, async () => {
	try {
        console.log(`Telegram app listening on port: ${PORT}`);
        await setupWebhook();
    } catch (error) {
        console.log(error.message);
    }
});
