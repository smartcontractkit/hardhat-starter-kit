//@flow

import EventEmitter from "events";
import type { DeviceModel } from "@ledgerhq/devices";
import {
  TransportError,
  StatusCodes,
  getAltStatusMessage,
  TransportStatusError
} from "@ledgerhq/errors";

export {
  TransportError,
  TransportStatusError,
  StatusCodes,
  getAltStatusMessage
};

/**
 */
export type Subscription = { unsubscribe: () => void };

/**
 */
export type Device = Object;

/**
 * type: add or remove event
 * descriptor: a parameter that can be passed to open(descriptor)
 * deviceModel: device info on the model (is it a nano s, nano x, ...)
 * device: transport specific device info
 */
export type DescriptorEvent<Descriptor> = {
  type: "add" | "remove",
  descriptor: Descriptor,
  deviceModel?: ?DeviceModel,
  device?: Device
};
/**
 */
export type Observer<Ev> = $ReadOnly<{
  next: (event: Ev) => mixed,
  error: (e: any) => mixed,
  complete: () => mixed
}>;

/**
 * Transport defines the generic interface to share between node/u2f impl
 * A **Descriptor** is a parametric type that is up to be determined for the implementation.
 * it can be for instance an ID, an file path, a URL,...
 */
export default class Transport<Descriptor> {
  exchangeTimeout: number = 30000;

  /**
   * Statically check if a transport is supported on the user's platform/browser.
   */
  static +isSupported: () => Promise<boolean>;

  /**
   * List once all available descriptors. For a better granularity, checkout `listen()`.
   * @return a promise of descriptors
   * @example
   * TransportFoo.list().then(descriptors => ...)
   */
  static +list: () => Promise<Array<Descriptor>>;

  /**
   * Listen all device events for a given Transport. The method takes an Obverver of DescriptorEvent and returns a Subscription (according to Observable paradigm https://github.com/tc39/proposal-observable )
   * a DescriptorEvent is a `{ descriptor, type }` object. type can be `"add"` or `"remove"` and descriptor is a value you can pass to `open(descriptor)`.
   * each listen() call will first emit all potential device already connected and then will emit events can come over times,
   * for instance if you plug a USB device after listen() or a bluetooth device become discoverable.
   * @param observer is an object with a next, error and complete function (compatible with observer pattern)
   * @return a Subscription object on which you can `.unsubscribe()` to stop listening descriptors.
   * @example
const sub = TransportFoo.listen({
  next: e => {
    if (e.type==="add") {
      sub.unsubscribe();
      const transport = await TransportFoo.open(e.descriptor);
      ...
    }
  },
  error: error => {},
  complete: () => {}
})
   */
  static +listen: (
    observer: Observer<DescriptorEvent<Descriptor>>
  ) => Subscription;

  /**
   * attempt to create a Transport instance with potentially a descriptor.
   * @param descriptor: the descriptor to open the transport with.
   * @param timeout: an optional timeout
   * @return a Promise of Transport instance
   * @example
TransportFoo.open(descriptor).then(transport => ...)
   */
  static +open: (
    descriptor: Descriptor,
    timeout?: number
  ) => Promise<Transport<Descriptor>>;

  /**
   * low level api to communicate with the device
   * This method is for implementations to implement but should not be directly called.
   * Instead, the recommanded way is to use send() method
   * @param apdu the data to send
   * @return a Promise of response data
   */
  +exchange: (apdu: Buffer) => Promise<Buffer>;

  /**
   * set the "scramble key" for the next exchanges with the device.
   * Each App can have a different scramble key and they internally will set it at instanciation.
   * @param key the scramble key
   */
  +setScrambleKey: (key: string) => void;

  /**
   * close the exchange with the device.
   * @return a Promise that ends when the transport is closed.
   */
  +close: () => Promise<void>;

  _events = new EventEmitter();

  /**
   * Listen to an event on an instance of transport.
   * Transport implementation can have specific events. Here is the common events:
   * * `"disconnect"` : triggered if Transport is disconnected
   */
  on(eventName: string, cb: Function) {
    this._events.on(eventName, cb);
  }

  /**
   * Stop listening to an event on an instance of transport.
   */
  off(eventName: string, cb: Function) {
    this._events.removeListener(eventName, cb);
  }

  emit(event: string, ...args: *) {
    this._events.emit(event, ...args);
  }

  /**
   * Enable or not logs of the binary exchange
   */
  setDebugMode() {
    console.warn(
      "setDebugMode is deprecated. use @ledgerhq/logs instead. No logs are emitted in this anymore."
    );
  }

  /**
   * Set a timeout (in milliseconds) for the exchange call. Only some transport might implement it. (e.g. U2F)
   */
  setExchangeTimeout(exchangeTimeout: number) {
    this.exchangeTimeout = exchangeTimeout;
  }

  /**
   * wrapper on top of exchange to simplify work of the implementation.
   * @param cla
   * @param ins
   * @param p1
   * @param p2
   * @param data
   * @param statusList is a list of accepted status code (shorts). [0x9000] by default
   * @return a Promise of response buffer
   */
  send = async (
    cla: number,
    ins: number,
    p1: number,
    p2: number,
    data: Buffer = Buffer.alloc(0),
    statusList: Array<number> = [StatusCodes.OK]
  ): Promise<Buffer> => {
    if (data.length >= 256) {
      throw new TransportError(
        "data.length exceed 256 bytes limit. Got: " + data.length,
        "DataLengthTooBig"
      );
    }
    const response = await this.exchange(
      Buffer.concat([
        Buffer.from([cla, ins, p1, p2]),
        Buffer.from([data.length]),
        data
      ])
    );
    const sw = response.readUInt16BE(response.length - 2);
    if (!statusList.some(s => s === sw)) {
      throw new TransportStatusError(sw);
    }
    return response;
  };

  /**
   * create() allows to open the first descriptor available or
   * throw if there is none or if timeout is reached.
   * This is a light helper, alternative to using listen() and open() (that you may need for any more advanced usecase)
   * @example
TransportFoo.create().then(transport => ...)
   */
  static create(
    openTimeout?: number = 3000,
    listenTimeout?: number
  ): Promise<Transport<Descriptor>> {
    return new Promise((resolve, reject) => {
      let found = false;
      const sub = this.listen({
        next: e => {
          found = true;
          if (sub) sub.unsubscribe();
          if (listenTimeoutId) clearTimeout(listenTimeoutId);
          this.open(e.descriptor, openTimeout).then(resolve, reject);
        },
        error: e => {
          if (listenTimeoutId) clearTimeout(listenTimeoutId);
          reject(e);
        },
        complete: () => {
          if (listenTimeoutId) clearTimeout(listenTimeoutId);
          if (!found) {
            reject(
              new TransportError(
                this.ErrorMessage_NoDeviceFound,
                "NoDeviceFound"
              )
            );
          }
        }
      });
      const listenTimeoutId = listenTimeout
        ? setTimeout(() => {
            sub.unsubscribe();
            reject(
              new TransportError(
                this.ErrorMessage_ListenTimeout,
                "ListenTimeout"
              )
            );
          }, listenTimeout)
        : null;
    });
  }

  exchangeBusyPromise: ?Promise<void>;

  // $FlowFixMe
  exchangeAtomicImpl = async f => {
    if (this.exchangeBusyPromise) {
      throw new TransportError("Transport race condition", "RaceCondition");
    }
    let resolveBusy;
    const busyPromise = new Promise(r => {
      resolveBusy = r;
    });
    this.exchangeBusyPromise = busyPromise;
    try {
      const res = await f();
      return res;
    } finally {
      if (resolveBusy) resolveBusy();
      this.exchangeBusyPromise = null;
    }
  };

  decorateAppAPIMethods(
    self: Object,
    methods: Array<string>,
    scrambleKey: string
  ) {
    for (let methodName of methods) {
      self[methodName] = this.decorateAppAPIMethod(
        methodName,
        self[methodName],
        self,
        scrambleKey
      );
    }
  }

  _appAPIlock = null;
  decorateAppAPIMethod<R, A: any[]>(
    methodName: string,
    f: (...args: A) => Promise<R>,
    ctx: *,
    scrambleKey: string
  ): (...args: A) => Promise<R> {
    return async (...args) => {
      const { _appAPIlock } = this;
      if (_appAPIlock) {
        return Promise.reject(
          new TransportError(
            "Ledger Device is busy (lock " + _appAPIlock + ")",
            "TransportLocked"
          )
        );
      }
      try {
        this._appAPIlock = methodName;
        this.setScrambleKey(scrambleKey);
        return await f.apply(ctx, args);
      } finally {
        this._appAPIlock = null;
      }
    };
  }

  static ErrorMessage_ListenTimeout = "No Ledger device found (timeout)";
  static ErrorMessage_NoDeviceFound = "No Ledger device found";
}
