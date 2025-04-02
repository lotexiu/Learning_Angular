import { isNull } from "../easy-use";
import { Nullable } from "../interfaces/misc-interfaces";

export class Timer {
  private startTime: Nullable<number> = null;
  private endTime: Nullable<number> = null;

  start(): void {
    this.startTime = Date.now();
    this.endTime = null;
  }

  stop(): void {
    if (!isNull(this.startTime)) {
      this.endTime = Date.now();
    }
  }

  get elapsedTime(): number {
    if (!isNull(this.startTime) && !isNull(this.endTime) ) {
      return this.endTime - this.startTime;
    }
    return -1;
  }
}
