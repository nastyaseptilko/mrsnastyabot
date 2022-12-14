const axios = require('axios');

const sendMessage = (res, api, message) => {
    return axios
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
            res.end('When you send message an error has occurred:' + err);
        });
};

module.exports = { sendMessage };
