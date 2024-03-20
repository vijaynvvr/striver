const axios = require('axios').default;

exports.submitCode = async (language, code, stdin) => {
    let language_code = 52;
    switch (language) {
        case "c_cpp":
            language_code = 54;
            break;
        case "java":
            language_code = 91;
            break;
        case "python":
            language_code = 92;
            break;
        case "javascript":
            language_code = 93;
            break;
    }

    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: {
            base64_encoded: 'true',
            fields: '*'
        },
        headers: {
            'content-type': 'application/json',
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        data: {
            language_id: language_code,
            source_code: btoa(code),
            stdin: btoa(stdin)
        }
    };

    try {
        const {data} = await axios.request(options);
        return data.token;
    } catch (error) {
        console.error(error);
    }
}