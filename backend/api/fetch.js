const axios = require('axios');

exports.fetchCode = async (token) => {
    const options = {
        method: 'GET',
        url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
        headers: {
            'X-RapidAPI-Key': '2d170c755dmshfd678dc0e15bbdap1bd393jsn3f3e9b7bec83',
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