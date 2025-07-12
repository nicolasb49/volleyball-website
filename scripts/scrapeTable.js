/**
 * scripts/scrapeTable.js
 *
 * JSF-AJAX-POST scrapen, alle CDATA-Blöcke sammeln,
 * dasjenige mit der Tabelle herausfiltern und parsen.
 */

const axios   = require('axios');
const cheerio = require('cheerio');
const qs      = require('qs');
const fs      = require('fs');
const path    = require('path');

const URL = 'https://www.volleyball-bundesliga.de/cms/home/2_bundesliga_frauen/2_bundesliga_frauen_sued/tabellespielplan/tabelle.xhtml';

async function scrape() {
  try {
    // 1) GET für ViewState
    const getRes = await axios.get(URL, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ' +
          'AppleWebKit/537.36 (KHTML, like Gecko) ' +
          'Chrome/115.0.0.0 Safari/537.36',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'de-DE,de;q=0.9',
      },
    });

    const $get = cheerio.load(getRes.data);
    const viewState = $get('input[name="jakarta.faces.ViewState"]').val();
    const formId    = 'samsCmsComponentSubViewForComponent226136:scoreTableComponentForm_226136';

    // 2) POST-Payload wie gesehen
    const payload = {
      'jakarta.faces.partial.ajax':   'true',
      'jakarta.faces.source':          `${formId}:j_idt406`,
      'jakarta.faces.partial.execute': '@all',
      'jakarta.faces.partial.render':  `${formId}:leagueResultsScoreTablePanel`,
      [`${formId}:j_idt406`]:         `${formId}:j_idt406`,
      [`${formId}:cmsLeaguePresenterScoreTablePeriodStart_input`]: '01.01.2025',
      [`${formId}:cmsLeaguePresenterScoreTablePeriodEnd_input`]:   '31.12.2025',
      'jakarta.faces.ViewState':       viewState,
    };

    const postRes = await axios.post(
      URL,
      qs.stringify(payload),
      {
        headers: {
          'Content-Type':    'application/x-www-form-urlencoded; charset=UTF-8',
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ' +
            'AppleWebKit/537.36 (KHTML, like Gecko) ' +
            'Chrome/115.0.0.0 Safari/537.36',
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'de-DE,de;q=0.9',
          Referer:           URL,
        },
      }
    );

    // 3) Alle CDATA-Blöcke extrahieren
    const raw = postRes.data;
    const cdataMatches = [...raw.matchAll(/<!\[CDATA\[([\s\S]*?)\]\]>/g)].map(m => m[1]);

    // 4) Den Block finden, der die Tabelle enthält
    const htmlFragment = cdataMatches.find(fragment =>
      fragment.includes('<table class="samsDataTable')
    );
    if (!htmlFragment) {
      throw new Error('Kein CDATA-Fragment mit klassenspezifischer Tabelle gefunden.');
    }

    // 5) Parsen und Zeilen auslesen
    const $ = cheerio.load(htmlFragment);
    const rows = $('table.samsDataTable tr').slice(1); // Header überspringen

    const result = rows.map((_, row) => {
      const cols = $(row).find('td');
      return {
        rank:   parseInt($(cols[0]).text().trim(), 10),
        club:   $(cols[1]).find('span.hideLeSmall').first().text().trim(),
        played: parseInt($(cols[3]).text().trim(), 10),
        won:    parseInt($(cols[4]).text().trim(), 10),
        sets:   $(cols[5]).text().trim(),
        points: parseInt($(cols[6]).text().trim(), 10),
      };
    }).get();

    // 6) In JSON speichern
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
