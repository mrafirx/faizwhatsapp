/**
 * You may choose to write your functions here, or make new files as you see fit.
 *
 * When marking your work, we will only be sending requests to your server and checking the response,
 * so any "functions" or code that you write here will not be directly assessed.
 */

import { Chat, getData } from './dataStore';

type EmptyObject = Record<never,never>;

interface ErrorObject {
  error: string;
}
interface User {
  userId: number;
}

interface Message {
  messageId: number;
}

interface chat {
  chats: Chat[];
}

export const signUp = (name: string, password: string): User | ErrorObject=> {
  const data = getData();

  if (name === "" || password === "") {
    return {error: "name or password cannot be empty"}
  }

  if (data.users.some(user => user.name === name)) {
    return {error: "You have been registered. Go to Login"}
  }

  const userId = data.users.length;
  data.users.push({ userId, name, password });
  return { userId };
}

export const login = (name: string, password: string): User | ErrorObject => {
  const data = getData();
  const user = data.users.find(user => user.name === name);
  if (!user) {
    return {error: "You have not been registered."};
  }

  if (user.password !== password) {
    return {error: "Incorrect Password!"}
  }

  return { userId: user.userId };
}

export const send = (senderId: number, text: string): Message | ErrorObject => {
  const data = getData();

  if (text === "") {
    return { error: "message cannot be empty" };
  }

  const messageId = data.chats.length;
  const timeSent = Math.floor(Date.now() / 1000);
  data.chats.push(
    { senderId, messageId, text, timeSent }
  );
  return { messageId };
}

export const messageList = (senderId: number): chat => {
  const data = getData();
  const chats = data.chats;
  return { chats };
}

export const clearData = (): EmptyObject => {
  const data = getData();

  data.chats.length = 0;
  data.users.length = 0;

  return { };
};
