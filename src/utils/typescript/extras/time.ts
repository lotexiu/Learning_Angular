import { Compare } from "@ts-natives/math/interfaces/math-interfaces"

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
  /**
 * Converts the current time instance to a specific time unit.
 *
 * @param type - The time unit to convert to. Can be either 'hour', 'minutes', or 'seconds'.
 *
 * @returns The converted time value.
 *  - If `type` is 'hour', returns the total hours as a floating-point number.
 *  - If `type` is 'minutes', returns the total minutes as a floating-point number.
 *  - If `type` is 'seconds', returns the total seconds as a floating-point number.
 *  - If `type` is not recognized, returns -1.
 */
castTimeTo(type: 'hour' | 'minutes' | 'seconds'): number {
  switch (type) {
    case "hour":
      return ((this.hour)).sum((this.minutes).divide(60)).sum((this.seconds).divide(60, 60))
    case "minutes":
      return ((this.hour).multiply(60)).sum((this.minutes)).sum((this.seconds).divide(60))
    case "seconds":
      return ((this.hour).multiply(60, 60)).sum((this.minutes).multiply(60)).sum((this.seconds))
    default:
      return -1
  }
}
}

class LocalDate {
  /**
   * @example
   * new Date('20/10/2013');
   * new Date(20,10,2013);
   * new Date('20',10);
   * new Date(20);
   */
  constructor(...date: (string | number)[]) {
    const dateParts: number[] = date.length > 1 ? 
      date.map((v: string | number): number => Number(v)) :
      date[0].toString().split('/').map((p: string): number => Number(p))
      this.day = minMax(dateParts[0] || 1, 1, 31)
      this.month = minMax(dateParts[1] || 1, 1, 12)
      this.year = Math.max(dateParts[2] || 0, 0)
  }
  private year: number = 0
  private month: number = 0
  private day: number = 0

  getYear(): number {
    return this.year
  }
  setYear(year: number): void {
    this.year = Math.max(year, 0)
  }
  getMonth(): number {
    return this.month
  }
  setMonth(month: number): void {
    this.month = minMax(month, 1, 12)
  }
  getDay(): number {
    return this.day
  }
  setDay(day: number): void {
    this.day = minMax(day, 1, 31)
  }
  /**
 * Converts the LocalDate instance to a string representation using the provided format and options.
 *
 * @param format - The format to use for the date string. Defaults to 'pt-br'.
 * @param options - Additional options for the date formatting.
 *
 * @returns A string representation of the LocalDate instance in the specified format.
 *
 * @example
 * const date = new LocalDate(20, 10, 2022);
 * console.log(date.toString()); // Output: "20/10/2022"
 * console.log(date.toString('en-US')); // Output: "10/20/2022"
 * console.log(date.toString('pt-br', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
 * // Output: "quarta-feira, 20 de outubro de 2022"
 */
toString(format='pt-br', options?: Intl.DateTimeFormatOptions): string {
  return this.toDate().toLocaleDateString(format, options)
}
  toDate(): Date {
    let formatedYear: string
    const date = new Date()
    if (this.year < 99) {
      formatedYear = date.getFullYear().toString().substring(0,2)+this.year
    }else{
      formatedYear = this.year.toString().padStart(4,'0')
    }
    const formatedMonth: string = this.month.toString().padStart(2, '0')
    const formatedDay: string = this.day.toString().padStart(2, '0')
    return new Date(`${formatedMonth}-${formatedDay}-${formatedYear}`)
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
  export function compareLocalDate(a: LocalDate, b: LocalDate): Compare {
    const aValue: number = a.toDate().getTime()
    const bValue: number = b.toDate().getTime()
    return (
      bValue > aValue ? -1 :
      bValue < aValue ? 1 : 0
    )
  }
}

function minMax(arg0: number, arg1: number, arg2: number): number {
  throw new Error("Function not implemented.")
}
