import fs from 'node:fs';
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import request from 'request';

async function getMeme() {
  try {
    const response = await fetch(
      'https://memegen-link-examples-upleveled.netlify.app/',
    );

    if (response.statusCode === 200) {
      console.log('error');
    }
    const html = await response.text();
    const $ = cheerio.load(html);
    let images = [];

    $('#images img').each(function () {
      images.push($(this).attr('src'));
    });

    images = images.slice(0, 10);

    for (let i = 0; i < images.length; i++) {
      const url = images[i];
      const fileName = [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
      ];
      const dir = './Memes';

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      const path = `./Memes/${fileName[i]}.jpg`;
      const download = (link, directory, callback) => {
        request.head(url, () => {
          request(url).pipe(fs.createWriteStream(path)).on('close', callback);
        });
      };
      download(url, path, () => {
        console.log('Memes successfully saved!');
      });
    }
  } catch (error) {
    console.log(error);
  }
}

await getMeme();
