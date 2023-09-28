const fs = require('fs');
const axios = require('axios');
const url = require('url');

async function fetchAndSave(urlStr) {
    try {
        const response = await axios.get(urlStr);
        const hostname = new url.URL(urlStr).hostname;

        fs.writeFileSync(hostname, response.data);
        console.log(`Wrote to ${hostname}`);
    } catch (error) {
        console.error(`Couldn't download ${urlStr}`);
    }
}

function main() {
    const filename = process.argv[2];

    if (!filename) {
        console.error('Please provide a filename as an argument.');
        process.exit(1);
    }

    fs.readFile(filename, 'utf-8', (err, data) => {
        if (err) {
            console.error(`Error reading file ${filename}:`, err);
            process.exit(1);
        }

        const urls = data.trim().split('\n');
        for (const urlStr of urls) {
            fetchAndSave(urlStr);
        }
    });
}

main();
