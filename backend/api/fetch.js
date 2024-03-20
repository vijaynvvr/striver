const axios = require('axios');

exports.fetchCode = async (token) => {
    const options = {
        method: 'GET',
        url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
        headers: {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
    };

    try {
        const {data} = await axios.request(options);
        return data;
    } catch (error) {
        console.error(error);
    }
}