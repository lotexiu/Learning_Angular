import { Compare } from "../interfaces/interfaces"
import { minMax } from "./math-utils"

class Time {
  /**
   * @example
   * new Time('24:00:00');
   * new Time(24,60,60);
   * new Time('24',60);
   * new Time(24);
   */
  constructor(...time: (string | number)[]) {
    const timeParts: number[] = time.length > 1 ? time.map((v: string | number): number => Number(v)) :
      time[0].toString().split(':').map((p: string): number => Number(p))
    this.hour = minMax(timeParts[0] || 0, 0, 23)
    this.minutes = minMax(timeParts[1] || 0, 0, 59)
    this.seconds = minMax(timeParts[2] || 0, 0, 59)
  }
  private hour: number = 0
  private minutes: number = 0
  private seconds: number = 0

  getHour(): number {
    return this.hour
  }
  setHour(hour: number): void {
    this.hour = minMax(hour, 0, 60)
  }
  getMinutes(): number {
    return this.minutes
  }
  setMinutes(minutes: number): void {
    this.minutes = minMax(minutes, 0, 60)
  }
  getSeconds(): number {
    return this.seconds
  }
  setSeconds(seconds: number): void {
    this.seconds = minMax(seconds, 0, 60)
  }

  toString(): string {
    return [this.hour, this.minutes, this.seconds].map((v: number): string => v.toString().padStart(2,'0')).join(':')
  }
  castTimeTo(type: 'hour' | 'minutes' | 'seconds'): number {
    switch (type) {
      case "hour":
        return ((this.hour)).plus((this.minutes).divide(60)).plus((this.seconds).divide(60, 60))
      case "minutes":
        return ((this.hour).multiply(60)).plus((this.minutes)).plus((this.seconds).divide(60))
      case "seconds":
        return ((this.hour).multiply(60, 60)).plus((this.minutes).multiply(60)).plus((this.seconds))
      default:
        return -1
    }
  }

}

namespace DateUtils {
  export function compareTime(a: Time, b: Time): Compare {
    const aValue: number = a.castTimeTo('seconds')
    const bValue: number = b.castTimeTo('seconds')
    return (
      bValue > aValue ? -1 :
        bValue < aValue ? 1 : 0
    )
  }
}

const {
  compareTime
} = DateUtils

export {
  Time,
  DateUtils,
  compareTime,
}