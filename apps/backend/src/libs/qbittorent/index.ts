import axios from 'axios';

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

  constructor(host: string, username: string, password: string) {
    this.#host = host;
    this.#username = username;
    this.#password = password;

    this.setupAxios(host);
  }

  setupAxios(host: string) {
    axios.defaults.baseURL = host;
    axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    axios.interceptors.request.use(
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
  }

  async login() {
    const response = await axios.post(QBITTORENT_API.login, {
      username: this.#username,
      password: this.#password,
    });
    const sid = response.headers['set-cookie'][0].split(';')[0].split('=')[1];
    this.#sid = sid;
    return response;
  }

  getVersion() {
    return axios.get(QBITTORENT_API.version);
  }

  addTorrent(torrent: string) {
    return axios.post(QBITTORENT_API.torrent_add, {
      urls: torrent,
    });
  }
}
