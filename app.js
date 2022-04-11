const axios = require('axios');
const ms = require('ms');
require('dotenv').config({ path: 'config.env' });
const express = require('express');
const app = express();

axios.defaults.headers.delete.Authorization = `Bearer ${process.env.TOKEN_API_HEROKU}`;
axios.defaults.headers.delete['Content-Type'] = 'application/json';
axios.defaults.headers.delete.Accept = 'application/vnd.heroku+json; version=3';

function sleep (ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

(async () => {
    console.log('🚀start...');
    // infinite loop
    do {
        const appName = process.env.APP_NAME;
        if (!appName) return console.log('APP_NAME is required!');
        try {
            console.log('🧐get to site application, please wait...');
            await axios.get(process.env.SITE_URL || `https://${appName}.herokuapp.com/`);
            console.log('✅application OK!');
        } catch (error) {
            if (error.response) {
                console.log(`🥵application error!! (status ${error.response.status}) 🛠️Restarting dynos, please wait...`);
                try {
                    const resetDynosResponse = await axios.delete(`https://api.heroku.com/apps/${appName}/dynos`);
                    console.log(`Successful operation: ${resetDynosResponse.status === 202}`);
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log(`😢 Error calling site ("${error.config.url}") -`, error.message);
            }
        }
        const WaitingTime = '50s';
        console.log(`⏳Waiting ${WaitingTime}. please wait...`);
        await sleep(ms(WaitingTime));
        console.log('😎Waiting completed!');
    } while (true);
})();

app.use('/', (req, res) => {
    res.status(200).json({ message: 'OK' });
});

const http = require('http');
const port = process.env.PORT || 3500;
const server = http.createServer(app);
server.listen(port);