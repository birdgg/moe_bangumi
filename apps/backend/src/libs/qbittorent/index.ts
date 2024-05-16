import axios, { AxiosInstance } from 'axios';
import * as https from 'https';
import { TorrentListOptions, TorrentOptions } from './interface';

const API = {
  login: 'auth/login',
  logout: 'auth/logout',
  version: 'app/version',
  torrent_list: 'torrents/info',
  torrent_add: 'torrents/add',
  torrent_contents: 'torrents/files',
  torrent_renameFile: 'torrents/renameFile',
};

export class Qbittorent {
  #host: string;
  #username: string;
  #password: string;
  #sid = '';
  #axios: AxiosInstance;
  isConnected = false;

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
        if (url !== API.login) {
          config.headers['Cookie'] = `SID=${this.#sid}`;
        }
        config.url = `/api/v2/${url}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.#axios = axiosInstance;
  }

  async login() {
    const response = await this.#axios.post(API.login, {
      username: this.#username,
      password: this.#password,
    });
    if (response.data == 'Failed') {
      throw new Error('qbittorrent login failed');
    }
    const sid = response.headers['set-cookie'][0].split(';')[0].split('=')[1];
    this.#sid = sid;
    this.isConnected = true;
    return response;
  }

  getVersion() {
    return this.#axios.get(API.version);
  }

  // torrent

  addTorrent(data: TorrentOptions) {
    return this.#axios.post(API.torrent_add, data);
  }

  getTorrentList(options: TorrentListOptions) {
    return this.#axios.get(API.torrent_list, {
      params: options,
    });
  }

  getTorrentContents(hash: string) {
    return this.#axios.get(API.torrent_contents, {
      params: { hash },
    });
  }

  renameFile(data: { hash: string; oldPath: string; newPath: string }) {
    return this.#axios.post(API.torrent_renameFile, data);
  }
}
