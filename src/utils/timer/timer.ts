import { cLog, isNull } from "../easy-use";
import { Nullable } from "../interfaces/misc-interfaces";

export class Timer {
  private readonly TIME_HASNT_STARTED: string = "Timer has not been started yet.";

  private hasBeenStopped: boolean = false;
  private _startTime: Nullable<number> = null;
  get startTime(): Nullable<number> {
    return this._startTime;
  }

  private _endTime: number = -1;
  set endTime(value: number) {
    this._endTime = value;
  }
  get endTime(): number {
    if (this.hasBeenStopped) {
      return this._endTime;
    } else if (!isNull(this._startTime)) {
      return Date.now()
    }
    cLog({type:"warn"}, this.TIME_HASNT_STARTED);
    return -1;
  }

  start(): void {
    this.hasBeenStopped = false
    this._startTime = Date.now();
  }

  stop(): void {
    if (!isNull(this._startTime)) {
      this.endTime = Date.now();
      this.hasBeenStopped = true;
    } else {
      cLog({type:"warn"}, this.TIME_HASNT_STARTED);
    }
  }

  get hasStopped(): boolean {
    return this.hasBeenStopped;
  }

  get difference(): number {
    if (!isNull(this._startTime) && !isNull(this.endTime) ) {
      return this.endTime - this._startTime;
    }
    cLog({type:"warn"}, this.TIME_HASNT_STARTED);
    return -1
  }
}
