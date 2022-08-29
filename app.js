
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const { sendMessage } = require('./helpers/send-message');
const { sendPhoto } = require('./helpers/send-photo');
const { sendAnimation } = require('./helpers/send-animation');

const { PORT, TELEGRAM_TOKEN, SERVER_URL, GIPHY_API_KEY } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;
const GIPHY_API = `https://api.giphy.com/v1`
const TELEGRAM_MENU = {
	cats: '/cats'
};

const setupWebhook = async () => {
    try {
		console.log(1);
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
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/name', (req, res) => {
    res.send('<h1> Telegram server </h1>');
});

app.post('/', async (req, res) => {
	const { message } = req.body
	const photo = message.photo;

	if(!message) {
		return res.end();
	}
	if(photo && photo.length){
		return sendPhoto(res, TELEGRAM_API, message);
	}
	if(message.text === TELEGRAM_MENU.cats) {
		const tag = 'cat';
		const result = await axios.get(`${GIPHY_API}/gifs/random?api_key=${GIPHY_API_KEY}&tag=${tag}`);
		if(!result) {
			return res.end('Random gif not received');
		}
		return sendAnimation(res, TELEGRAM_API, message.chat.id, result.data.data.images.original.url);
	}
	return sendMessage(res, TELEGRAM_API, message);
});

app.listen(PORT, async () => {
	try {
        console.log(`Telegram app listening on port: ${PORT}`);
        await setupWebhook();
    } catch (error) {
        console.log(error.message);
    }
});
