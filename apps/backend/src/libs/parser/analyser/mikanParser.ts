import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

const SAVE_PATH = path.join(process.cwd(), '/public');

export async function mikanParser(url: string) {
  console.log(`mikanParser: ${url}`);
  const res = await axios.get(url);
  const html = res.data;
  const $ = cheerio.load(html);
  const posterString = $('.bangumi-poster').attr('style');
  const title = $('p.bangumi-title a[href^="/Home/Bangumi/"]').text();
  const poster = posterString.match(/url\('?(.*?)"?\)/i)[1].split('?')[0];
  const posterPath = await saveImage(`${new URL(url).origin}${poster}`);
  return {
    title,
    poster: posterPath,
  };
}

async function saveImage(url: string) {
  const ext = path.extname(url);
  if (!fs.existsSync(SAVE_PATH)) {
    fs.mkdirSync(SAVE_PATH);
  }
  const response = await axios.get(url, {
    responseType: 'stream',
  });
  const fileName = `${uuidv4()}${ext}`;
  const file = `${SAVE_PATH}/${fileName}`;
  response.data.pipe(fs.createWriteStream(file));
  response.data.on('end', () => {
    console.log(`Downloaded poster to ${file}`);
  });
  return fileName;
}
