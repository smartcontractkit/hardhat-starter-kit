export declare type CancellablePromise<T> = Promise<T> & {
	cancel(): void;
};
export declare type NotYetTyped = { [ key: string ]: any; };
export declare type RegisterRequest = NotYetTyped;
export declare type SignRequest = NotYetTyped;
export declare type RegisterResponse = NotYetTyped;
export declare type SignResponse = NotYetTyped;
export declare enum ErrorCodesEnum {
	CANCELLED = -1,
	OK = 0,
	OTHER_ERROR = 1,
	BAD_REQUEST = 2,
	CONFIGURATION_UNSUPPORTED = 3,
	DEVICE_INELIGIBLE = 4,
	TIMEOUT = 5,
}
export declare const ErrorNames: {
	"-1": string;
	"0": string;
	"1": string;
	"2": string;
	"3": string;
	"4": string;
	"5": string;
};
export interface API {
	isSupported: () => CancellablePromise<boolean>;
	ensureSupport: () => CancellablePromise<void>;
	register: (registerRequests: RegisterRequest | ReadonlyArray<RegisterRequest>, signRequests?: SignRequest | ReadonlyArray<SignRequest>, timeout?: number) => CancellablePromise<RegisterResponse>;
	sign: (signRequests: SignRequest | ReadonlyArray<SignRequest>, timeout?: number) => CancellablePromise<SignResponse>;
	ErrorCodes: ErrorCodesEnum;
}
export declare type ExporterType = ((promiseImplementation: PromiseConstructorLike) => API) & API;
declare const _default: ExporterType;
export default _default;
