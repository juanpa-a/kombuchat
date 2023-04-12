import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCdl-RwOB7Kii6zQJaXdjGkKpxWYTlAvDo",
  authDomain: "kombuchat-app.firebaseapp.com",
  projectId: "kombuchat-app",
  storageBucket: "kombuchat-app.appspot.com",
  messagingSenderId: "1053934967631",
  appId: "1:1053934967631:web:51de437695e1f5cfea833a",
  databaseURL: "https://kombuchat-app-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db  = getDatabase(app)

export type Message = {
  id: number,
  author: string,
  text: string
}

export const ApiService = (channelId: string, author: string) => ({
  createMessage: (text: string) => {
    set(ref(db, `${channelId}/${Date.now()}`), {
      id: Date.now(),
      author,
      text
    })
  },
  connectToChannel: (sync: Function) => {
    const channelRef = ref(db, channelId)
    onValue(channelRef, snapshot => {
      sync(snapshot.val())
    })
  },
  editMessage: (messageId: number, text: string) => {
    set(ref(db, `${channelId}/${messageId}`), {
      id: messageId,
      author,
      text
    })    
  },
  deleteMessage: (messageId: number) => {
    set(ref(db, `${channelId}/${messageId}`), null)
  },
})
