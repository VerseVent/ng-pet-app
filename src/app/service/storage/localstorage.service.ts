import { ISetting } from 'src/app/interfaces/ISetting';

export class LocalStorageService {
  getUserToken() {
    return localStorage.getItem('auth_token');
  }
  getUserSettings(): ISetting | void {
    const settings = localStorage.getItem('user_settings');
    if (settings) {
      return JSON.parse(settings);
    }
  }
  setUserSettings(userSettings: ISetting): void {
    const settings = JSON.stringify(userSettings);
    if (settings) {
      localStorage.setItem('user_settings', settings);
    }
  }
}
