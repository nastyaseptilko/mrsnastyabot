const axios = require('axios');

module.exports = { 
    sendMessage(api, message) {
        console.log(message, 'message sendMessage')

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
                res.end('When you send message an error has occurred:' + err);
            })
    }    
 };
