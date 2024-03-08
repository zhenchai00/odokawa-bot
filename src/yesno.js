const axios = require('axios');

async function getYesNo() {
    try {
        let response = await axios.get('https://yesno.wtf/api');
        return response.data;
    } catch (error) {
        console.log(__filename, " ", error);
    }
}

module.exports = { getYesNo };