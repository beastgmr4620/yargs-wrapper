import Random from './Random';

type Callback<StateType> = (newState: StateType) => void;

export default class Observable<StateType> {
  private state: StateType;
  private callbackStore: Map<string, Callback<StateType>>;

  public constructor(initialState: StateType) {
    this.state = initialState;
    this.callbackStore = new Map<string, Callback<StateType>>();
  }

  private callSubcribers(newState: StateType): void {
    this.callbackStore.forEach((callback) => {
      callback(newState);
    });
  }

  public setState(newState: StateType, silence = false): void {
    if (!silence) this.callSubcribers(newState);

    this.state = newState;
  }

  public subcribe(callback: Callback<StateType>): string {
    let callbackID: string;

    do {
      callbackID = Random.randomString(3);
    } while (this.callbackStore.has(callbackID));

    this.callbackStore.set(callbackID, callback);
    return callbackID;
  }

  public unsubcribe(callbackID: string): void {
    this.callbackStore.delete(callbackID);
  }

  public getState(): StateType {
    return this.state;
  }
}
