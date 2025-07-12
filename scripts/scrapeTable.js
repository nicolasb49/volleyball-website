const axios = require('axios');
const cheerio = require('cheerio');
const qs      = require('qs');
const fs      = require('fs');
const path    = require('path');

const URL = 'https://www.volleyball-bundesliga.de/cms/home/2_bundesliga_frauen/2_bundesliga_frauen_sued/tabellespielplan/tabelle.xhtml';

async function scrape() {
  try {
    const getRes = await axios.get(URL, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ' +
          'AppleWebKit/537.36 (KHTML, like Gecko) ' +
          'Chrome/115.0.0.0 Safari/537.36',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7',
      },
    });

    const $get = cheerio.load(getRes.data);
    const viewState = $get('input[name="jakarta.faces.ViewState"]').val();
    const formId = 'samsCmsComponentSubViewForComponent226136:scoreTableComponentForm_226136';

    const payload = {
      'jakarta.faces.partial.ajax':   'true',
      'jakarta.faces.source':          `${formId}:j_idt406`,
      'jakarta.faces.partial.execute': '@all',
      'jakarta.faces.partial.render':  `${formId}:scoreTablePanel`,
      [`${formId}:j_idt406`]:         `${formId}:j_idt406`,
      [`${formId}:cmsLeaguePresenterScoreTablePeriodStart_input`]: '1.1.2025',
      [`${formId}:cmsLeaguePresenterScoreTablePeriodEnd_input`]:   '31.12.2025',
      'jakarta.faces.ViewState':       viewState,
    };

    const postRes = await axios.post(
      URL,
      qs.stringify(payload),
      {
        headers: {
          'Content-Type':  'application/x-www-form-urlencoded; charset=UTF-8',
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ' +
            'AppleWebKit/537.36 (KHTML, like Gecko) ' +
            'Chrome/115.0.0.0 Safari/537.36',
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7',
          Referer:            URL,
        },
      }
    );

    const $ = cheerio.load(postRes.data);
    const rows = $('table.styled-table tbody tr');
    const result = [];

    rows.each((_, row) => {
      const cols = $(row).find('td');
      if (cols.length < 7) return; 

      result.push({
        rank:    parseInt($(cols[0]).text().trim(), 10),
        club:    $(cols[1]).text().trim().replace(/\n/g, ' '),
        played:  $(cols[2]).text().trim(),
        won:     $(cols[3]).text().trim(),
        lost:    $(cols[4]).text().trim(),
        sets:    $(cols[5]).text().trim(),
        points:  $(cols[6]).text().trim(),
      });
    });

    const outPath = path.join(__dirname, '..', 'data', 'table.json');
    fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf-8');
    console.log(`✓ Tabelle erfolgreich geschrieben: ${outPath} (${result.length} Einträge)`);

  } catch (err) {
    console.error('✗ Fehler beim Scrapen der Tabelle:', err.message || err);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  scrape();
}

module.exports = { scrape };
