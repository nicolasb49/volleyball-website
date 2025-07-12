const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const URL = 'https://www.volleyball-bundesliga.de/cms/home/2_bundesliga_frauen/2_bundesliga_frauen_sued/tabellespielplan/tabelle.xhtml';

async function scrape() {
  try {
    const { data } = await axios.get(URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) " +
                      "AppleWebKit/537.36 (KHTML, like Gecko) " +
                      "Chrome/115.0.0.0 Safari/537.36",
        Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
      },
    });
    const $ = cheerio.load(data);
    const tableRows = $('table.styled-table tbody tr');

    const result = [];

    tableRows.each((_, row) => {
      const cols = $(row).find('td');
      if (cols.length < 8) return; // skip header or invalid rows

      const entry = {
        rank: parseInt($(cols[0]).text().trim(), 10),
        club: $(cols[1]).text().trim().replace(/\n/g, ' '),
        matches: parseInt($(cols[2]).text().trim(), 10),
        points: parseInt($(cols[3]).text().trim(), 10),
        setsWon: parseInt($(cols[4]).text().trim(), 10),
        setsLost: parseInt($(cols[5]).text().trim(), 10),
        ballsWon: parseInt($(cols[6]).text().trim(), 10),
        ballsLost: parseInt($(cols[7]).text().trim(), 10),
      };

      result.push(entry);
    });

    const outPath = path.join(__dirname, '..', 'data', 'table.json');
    fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
    console.log(`Saved ${result.length} entries to ${outPath}`);
  } catch (err) {
    console.error('Failed to scrape table:', err);
    process.exitCode = 1;
  }
}

scrape();
