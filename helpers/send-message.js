const axios = require('axios');

function sendMessage(api, message) {
    axios
		.post(
			`${api}/sendMessage`,
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
}

module.exports = sendMessage;
