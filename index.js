const fs = require('fs');
const csv = require('csv-parser');
const results = [];

// Function to write data to a file
const writeToFile = (filename, data) => {
    const stream = fs.createWriteStream(filename);
    stream.write('country,year,population\n'); // Writing headers
    data.forEach(row => stream.write(`${row.country},${row.year},${row.population}\n`));
    stream.end();
};

// Delete existing files
['canada.txt', 'usa.txt'].forEach(file => {
    if (fs.existsSync(file)) {
        fs.unlinkSync(file);
    }
});

// Read CSV and filter data
fs.createReadStream('input_countries.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        // Filter for Canada and USA
        const canadaData = results.filter(row => row.country.toLowerCase() === 'canada');
        const usaData = results.filter(row => row.country.toLowerCase() === 'united states');

        // Write filtered data to files
        writeToFile('canada.txt', canadaData);
        writeToFile('usa.txt', usaData);
    });
