import * as RssParser from 'rss-parser';
import * as EventEmitter from 'eventemitter2';
import { CronJob } from 'cron';

function millisecondsToCron(milliseconds) {
  const date = new Date(milliseconds);
  const minute = date.getMinutes();
  const hour = date.getHours();
  const dayOfMonth = date.getDate();
  const month = date.getMonth() + 1;
  const dayOfWeek = date.getDay(); // 星期几，0 表示星期日

  return `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
}

class Feed {
  parser: RssParser;

  constructor() {
    this.parser = new RssParser();
  }

  addFeed(url: string, interval: number) {
    const job = new CronJob(
      `*/${interval} * * * *`,
      async () => {},
      null,
      true,
    );
  }

  on(eventName: string, callback: (item: any) => void) {}
}

const RSS_URL =
  'https://mikanani.me/RSS/MyBangumi?token=IrNydFnGd1%2fZ56onK1aljQ%3d%3d';

let a = new Feed();
a.addFeed(RSS_URL, 5);
