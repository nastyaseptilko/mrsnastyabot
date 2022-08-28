const axios = require('axios');

const sendPhoto = (api, message) => {
    console.log(message, 'message sendPhoto')
    return axios
        .post(
            `${api}/sendPhoto`,
            {
                chat_id: message.chat.id,
                photo: message.photo[0].file_id,
                caption: message.caption,
            }
        )
        .then(() => {
            res.end('ok');
        })
        .catch((err) => {
            res.end('Photo does not send:' + err);
        })
};

module.exports = { sendPhoto };
