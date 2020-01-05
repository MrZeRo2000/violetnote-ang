export const environment = {
  VERSION: require('../../package.json').version,
  production: true,
  passDataUrl: 'http://localhost:8080/violetnote-wss/passdata',
  passDataFileInfoUrl: 'http://localhost:8080/violetnote-wss/passdata/fileinfo',
  loadDelay: 0,
  autoHidePassNoteDelay: 15000
};
