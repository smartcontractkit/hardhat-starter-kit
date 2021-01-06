// @flow

/**
 * A Log object
 */
export type Log = {
  type: string,
  message?: string,
  data?: any,
  id: string, // unique amount all logs
  date: Date // date of the log
};

export type Unsubscribe = () => void;

let id = 0;
const subscribers = [];

/**
 * log something
 * @param type a namespaced identifier of the log (it is not a level like "debug", "error" but more like "apdu-in", "apdu-out", etc...)
 * @param message a clear message of the log associated to the type
 */
export const log = (type: string, message?: string, data?: any) => {
  const obj: Log = { type, id: String(++id), date: new Date() };
  if (message) obj.message = message;
  if (data) obj.data = data;
  dispatch(obj);
};

/**
 * listen to logs.
 * @param cb that is called for each future log() with the Log object
 * @return a function that can be called to unsubscribe the listener
 */
export const listen = (cb: Log => void): Unsubscribe => {
  subscribers.push(cb);
  return () => {
    const i = subscribers.indexOf(cb);
    if (i !== -1) {
      // equivalent of subscribers.splice(i, 1) // https://twitter.com/Rich_Harris/status/1125850391155965952
      subscribers[i] = subscribers[subscribers.length - 1];
      subscribers.pop();
    }
  };
};

function dispatch(log: Log) {
  for (let i = 0; i < subscribers.length; i++) {
    try {
      subscribers[i](log);
    } catch (e) {
      console.error(e);
    }
  }
}

// for debug purpose
global.__ledgerLogsListen = listen;
