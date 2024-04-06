import axios, { AxiosInstance } from 'axios';
import * as https from 'https';
import { TorrentOptions } from './interface';

const QBITTORENT_API = {
  login: 'auth/login',
  logout: 'auth/logout',
  version: 'app/version',
  torrent_list: 'torrents/info',
  torrent_add: 'torrents/add',
};

export class Qbittorent {
  #host: string;
  #username: string;
  #password: string;
  #sid = '';
  #axiosInstance: AxiosInstance;

  constructor(host: string, username: string, password: string) {
    this.#host = host;
    this.#username = username;
    this.#password = password;

    this.setupAxios();
  }

  setupAxios() {
    const axiosInstance = axios.create({
      baseURL: this.#host,
    });
    axiosInstance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    if (process.env.NODE_ENV === 'dev') {
      const httpsAgent = new https.Agent({ rejectUnauthorized: false });
      axiosInstance.defaults.httpsAgent = httpsAgent;
    }
    axiosInstance.interceptors.request.use(
      (config) => {
        const { url } = config;
        config.headers['Referer'] = this.#host;
        config.headers['Host'] = this.#host;
        if (url !== QBITTORENT_API.login) {
          if (!this.#sid) {
            throw new Error('qbittorrent not logged in');
          }
          config.headers['Cookie'] = `SID=${this.#sid}`;
        }
        config.url = `/api/v2/${url}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    this.#axiosInstance = axiosInstance;
  }

  async login() {
    const response = await this.#axiosInstance.post(QBITTORENT_API.login, {
      username: this.#username,
      password: this.#password,
    });
    const sid = response.headers['set-cookie'][0].split(';')[0].split('=')[1];
    this.#sid = sid;
    return response;
  }

  getVersion() {
    return this.#axiosInstance.get(QBITTORENT_API.version);
  }

  addTorrent(data: TorrentOptions) {
    return this.#axiosInstance.post(QBITTORENT_API.torrent_add, data);
  }
}

// let a = new Qbittorent('http://qb.backend.orb.local', 'admin', 'fG9yyJWwW');
// a.login();
