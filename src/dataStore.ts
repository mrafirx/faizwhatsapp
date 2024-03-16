/**
 * This is a stub dataStore - you can ignore or edit and use it as you please!
 */

export interface User {
  userId: number;
  name: string;
  password: string;
}

export interface Chat {
  messageId: number;
  senderId: number;
  text: string;
  timeSent: number;
}

interface DataStore {
  chats: Chat[];
  users: User[];
}

let dataStore: DataStore = {
  chats: [],
  users: []
};

export const getData = (): DataStore => dataStore;
export function setData(data) {
  dataStore = data; 
}