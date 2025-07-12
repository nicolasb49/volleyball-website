const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const URL = 'https://www.volleyball-bundesliga.de/popup/matchSeries/teamDetails.xhtml?teamId=776309596';
const TEAM_NAME = 'SV Karlsruhe Beiertheim';

async function scrape() {
  try {
    const { data } = await axios.get(URL);
    const $ = cheerio.load(data);

    const upcoming = [];
    $('table.styled-table tbody tr').each((_, row) => {
      const cols = $(row).find('td');
      if (cols.length < 4) return;

      const dateText = $(cols[0]).text().trim();
      const timeText = $(cols[1]).text().trim();
      const teamsText = $(cols[2]).text().trim();
      const locationText = $(cols[3]).text().trim();

      if (!dateText || !timeText || !teamsText) return;

      // Parse date and time
      const [day, month, year] = dateText.split('.');
      const [hour = '00', minute = '00'] = timeText.split(':');
      const isoDate = `${year}-${month}-${day}T${hour}:${minute}:00`;
      const matchDate = new Date(isoDate);
      if (isNaN(matchDate.getTime())) return;
      if (matchDate <= new Date()) return;

      let opponent = teamsText.replace(TEAM_NAME, '').replace(/\s*-\s*/, '').trim();
      if (!opponent) opponent = teamsText.trim();

      upcoming.push({
        opponent,
        dateText,
        timeText,
        locationText,
        matchDate
      });
    });

    if (upcoming.length === 0) {
      console.log('No upcoming matches found');
      return;
    }

    upcoming.sort((a, b) => a.matchDate - b.matchDate);
    const next = upcoming[0];
    const result = {
      opponent: next.opponent,
      date: next.dateText,
      time: next.timeText,
      venue: next.locationText
    };

    const outPath = path.join(__dirname, '..', 'data', 'nextMatch.json');
    fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
    console.log(`Saved next match to ${outPath}`);
  } catch (err) {
    console.error('Failed to scrape next match:', err);
    process.exitCode = 1;
  }
}

scrape();
