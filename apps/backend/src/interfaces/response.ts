export interface MikanRssItem {
  title: string;
  link: string;
  enclosure: {
    type: string;
    length: string;
    url: string;
  };
}
