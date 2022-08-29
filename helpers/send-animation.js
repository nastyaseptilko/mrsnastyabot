const axios = require('axios');

const sendAnimation = (res, api, chatId, animationUrl) => {
    console.log(animationUrl, 'animationUrl')
    return axios
        .post(
            `${api}/sendAnimation`,
            {
                chat_id: chatId,
                animation: animationUrl,
            }
        )
        .then(() => {
            res.end('ok');
        })
        .catch((err) => {
            res.end('Animation does not send:' + err);
        });
};

module.exports = { sendAnimation };
