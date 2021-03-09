import store from '../Store/index';
const { ipcRenderer } = window.require('electron');

export const saveNote = async(note) => {
  ipcRenderer.invoke('save-note', note).then((notes) => {
      store.dispatch({ type: 'update-notes', payload: { notes } });
  });  
};

export const getNotes = async() => {
  ipcRenderer.invoke('get-notes', '').then((notes) => {
    store.dispatch({ type: 'update-notes', payload: { notes } });
  });
}

// "build": "npm run build-react && npm run build-electron",
// "start": "concurrently \"cross-env BROWSER=none npm run start-react\" \"wait-on http://localhost:3000 && electron .  --disable-gpu\""
