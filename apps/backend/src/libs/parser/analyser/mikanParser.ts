import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

const SAVE_PATH = path.join(process.cwd(), '/public');

/**
 * scrape infomation from mikan bangumi detail page
 */
export async function mikanParser(url: string) {
  const res = await axios.get(url);
  const html = res.data;
  const $ = cheerio.load(html);
  const posterString = $('.bangumi-poster').attr('style');
  const title = $('p.bangumi-title a[href^="/Home/Bangumi/"]').text();
  const poster = posterString.match(/url\('?(.*?)"?\)/i)[1].split('?')[0];
  const posterPath = await saveImage(`${new URL(url).origin}${poster}`, title);
  return {
    title,
    poster: posterPath,
  };
}

async function saveImage(url: string, title: string) {
  const hash = crypto.createHash('md5').update(title).digest('hex');
  const ext = path.extname(url);
  const filename = `${hash}${ext}`;
  if (!fs.existsSync(SAVE_PATH)) {
    fs.mkdirSync(SAVE_PATH);
  }
  const response = await axios.get(url, {
    responseType: 'stream',
  });
  const file = `${SAVE_PATH}/${filename}`;
  response.data.pipe(fs.createWriteStream(file));
  response.data.on('end', () => {
    console.log(`Downloaded poster to ${filename}`);
  });
  return filename;
}
