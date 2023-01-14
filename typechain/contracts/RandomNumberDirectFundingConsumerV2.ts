/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface RandomNumberDirectFundingConsumerV2Interface
  extends utils.Interface {
  functions: {
    "acceptOwnership()": FunctionFragment;
    "getNumberOfRequests()": FunctionFragment;
    "getRequestStatus(uint256)": FunctionFragment;
    "lastRequestId()": FunctionFragment;
    "owner()": FunctionFragment;
    "rawFulfillRandomWords(uint256,uint256[])": FunctionFragment;
    "requestIds(uint256)": FunctionFragment;
    "requestRandomWords(uint32,uint16,uint32)": FunctionFragment;
    "s_requests(uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "withdrawLink(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "acceptOwnership"
      | "getNumberOfRequests"
      | "getRequestStatus"
      | "lastRequestId"
      | "owner"
      | "rawFulfillRandomWords"
      | "requestIds"
      | "requestRandomWords"
      | "s_requests"
      | "transferOwnership"
      | "withdrawLink"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "acceptOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getNumberOfRequests",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getRequestStatus",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "lastRequestId",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "rawFulfillRandomWords",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "requestIds",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "requestRandomWords",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "s_requests",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawLink",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "acceptOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNumberOfRequests",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRequestStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lastRequestId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "rawFulfillRandomWords",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "requestIds", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "requestRandomWords",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "s_requests", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawLink",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferRequested(address,address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "RequestFulfilled(uint256,uint256[],uint256)": EventFragment;
    "RequestSent(uint256,uint32,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferRequested"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RequestFulfilled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RequestSent"): EventFragment;
}

export interface OwnershipTransferRequestedEventObject {
  from: string;
  to: string;
}
export type OwnershipTransferRequestedEvent = TypedEvent<
  [string, string],
  OwnershipTransferRequestedEventObject
>;

export type OwnershipTransferRequestedEventFilter =
  TypedEventFilter<OwnershipTransferRequestedEvent>;

export interface OwnershipTransferredEventObject {
  from: string;
  to: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface RequestFulfilledEventObject {
  requestId: BigNumber;
  randomWords: BigNumber[];
  payment: BigNumber;
}
export type RequestFulfilledEvent = TypedEvent<
  [BigNumber, BigNumber[], BigNumber],
  RequestFulfilledEventObject
>;

export type RequestFulfilledEventFilter =
  TypedEventFilter<RequestFulfilledEvent>;

export interface RequestSentEventObject {
  requestId: BigNumber;
  numWords: number;
  paid: BigNumber;
}
export type RequestSentEvent = TypedEvent<
  [BigNumber, number, BigNumber],
  RequestSentEventObject
>;

export type RequestSentEventFilter = TypedEventFilter<RequestSentEvent>;

export interface RandomNumberDirectFundingConsumerV2 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: RandomNumberDirectFundingConsumerV2Interface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getNumberOfRequests(overrides?: CallOverrides): Promise<[BigNumber]>;

    getRequestStatus(
      _requestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, boolean, BigNumber[]] & {
        paid: BigNumber;
        fulfilled: boolean;
        randomWords: BigNumber[];
      }
    >;

    lastRequestId(overrides?: CallOverrides): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    rawFulfillRandomWords(
      _requestId: PromiseOrValue<BigNumberish>,
      _randomWords: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    requestIds(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    requestRandomWords(
      _callbackGasLimit: PromiseOrValue<BigNumberish>,
      _requestConfirmations: PromiseOrValue<BigNumberish>,
      _numWords: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    s_requests(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, boolean] & { paid: BigNumber; fulfilled: boolean }>;

    transferOwnership(
      to: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawLink(
      _receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  acceptOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getNumberOfRequests(overrides?: CallOverrides): Promise<BigNumber>;

  getRequestStatus(
    _requestId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, boolean, BigNumber[]] & {
      paid: BigNumber;
      fulfilled: boolean;
      randomWords: BigNumber[];
    }
  >;

  lastRequestId(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  rawFulfillRandomWords(
    _requestId: PromiseOrValue<BigNumberish>,
    _randomWords: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  requestIds(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  requestRandomWords(
    _callbackGasLimit: PromiseOrValue<BigNumberish>,
    _requestConfirmations: PromiseOrValue<BigNumberish>,
    _numWords: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  s_requests(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<[BigNumber, boolean] & { paid: BigNumber; fulfilled: boolean }>;

  transferOwnership(
    to: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawLink(
    _receiver: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    acceptOwnership(overrides?: CallOverrides): Promise<void>;

    getNumberOfRequests(overrides?: CallOverrides): Promise<BigNumber>;

    getRequestStatus(
      _requestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, boolean, BigNumber[]] & {
        paid: BigNumber;
        fulfilled: boolean;
        randomWords: BigNumber[];
      }
    >;

    lastRequestId(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    rawFulfillRandomWords(
      _requestId: PromiseOrValue<BigNumberish>,
      _randomWords: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    requestIds(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    requestRandomWords(
      _callbackGasLimit: PromiseOrValue<BigNumberish>,
      _requestConfirmations: PromiseOrValue<BigNumberish>,
      _numWords: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    s_requests(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, boolean] & { paid: BigNumber; fulfilled: boolean }>;

    transferOwnership(
      to: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawLink(
      _receiver: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "OwnershipTransferRequested(address,address)"(
      from?: PromiseOrValue<string> | null,
      to?: PromiseOrValue<string> | null
    ): OwnershipTransferRequestedEventFilter;
    OwnershipTransferRequested(
      from?: PromiseOrValue<string> | null,
      to?: PromiseOrValue<string> | null
    ): OwnershipTransferRequestedEventFilter;

    "OwnershipTransferred(address,address)"(
      from?: PromiseOrValue<string> | null,
      to?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      from?: PromiseOrValue<string> | null,
      to?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "RequestFulfilled(uint256,uint256[],uint256)"(
      requestId?: null,
      randomWords?: null,
      payment?: null
    ): RequestFulfilledEventFilter;
    RequestFulfilled(
      requestId?: null,
      randomWords?: null,
      payment?: null
    ): RequestFulfilledEventFilter;

    "RequestSent(uint256,uint32,uint256)"(
      requestId?: null,
      numWords?: null,
      paid?: null
    ): RequestSentEventFilter;
    RequestSent(
      requestId?: null,
      numWords?: null,
      paid?: null
    ): RequestSentEventFilter;
  };

  estimateGas: {
    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getNumberOfRequests(overrides?: CallOverrides): Promise<BigNumber>;

    getRequestStatus(
      _requestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lastRequestId(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    rawFulfillRandomWords(
      _requestId: PromiseOrValue<BigNumberish>,
      _randomWords: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    requestIds(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    requestRandomWords(
      _callbackGasLimit: PromiseOrValue<BigNumberish>,
      _requestConfirmations: PromiseOrValue<BigNumberish>,
      _numWords: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    s_requests(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      to: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawLink(
      _receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getNumberOfRequests(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRequestStatus(
      _requestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lastRequestId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rawFulfillRandomWords(
      _requestId: PromiseOrValue<BigNumberish>,
      _randomWords: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    requestIds(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    requestRandomWords(
      _callbackGasLimit: PromiseOrValue<BigNumberish>,
      _requestConfirmations: PromiseOrValue<BigNumberish>,
      _numWords: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    s_requests(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      to: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawLink(
      _receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
