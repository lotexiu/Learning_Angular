import { ColorUtils } from "../color/color-utils";
import { Color } from "../color/interfaces/color-interface";
import { Nullable } from "../interfaces/misc-interfaces";
import { GenericUtils } from "./generic-utils";


type ConsoleOptions = {
  caller?: boolean;
  callerLevel?: number;
  TimeDifference?: boolean;
  type?: 'log' | 'warn' | 'error';
}
class ConsoleUtils {
  private static lastLogTime: number = 0;

  private static isConsoleOptions(options: any): options is ConsoleOptions {
    const keys: string[] = ['caller', 'callerLevel', 'TimeDifference', 'type'];
    if (!options || typeof options !== 'object') return false;
    const objKeys = Object.keys(options);
    if (!objKeys.every((k) => keys.includes(k))) {
      return false;
    }
    return keys.some((key) => options.hasOwnProperty(key));
  }

  static log(options: Nullable<ConsoleOptions>, ...args: any[]): void;
  static log(...args: any[]): void;
  static log(...args: any[]): void {
    const options: Nullable<ConsoleOptions> = ConsoleUtils.isConsoleOptions(args[0]) ? args.shift() : null;
    const logData: any[] = GenericUtils.formatLogData(args);
    const timeDifference: number = ConsoleUtils.calculateTimeDifference();

    const { R, G, B } = ConsoleUtils.getInterpolatedColor(timeDifference);

    let logMessage: string = '\n';

    if (options && Object.keys(options).length > 0) {
      options.type = options.type || 'log';

      if (options.TimeDifference) {
        logMessage += `%c${timeDifference}ms%c \n`;
      }
      if (options.caller) {
        let calledBy: string = GenericUtils.getCaller();
        if (options.callerLevel) {
          calledBy = GenericUtils.getCaller(options.callerLevel+3);
        }
        logMessage += `${calledBy} \n`;
      }
      if (options.TimeDifference) {
        console[options.type](
          logMessage,
          `font-size:13px; background:rgb(${R},${G},${B}); color:white;`,'',
          ...logData
        );
      } else {
        console[options.type](
          logMessage,
          ...logData
        );
      }
    }
    else {
      console.log('',...logData);
    }
  }

  private static calculateTimeDifference(): number {
    const currentTime: number = Date.now();
    if (ConsoleUtils.lastLogTime === 0) {
      ConsoleUtils.lastLogTime = currentTime;
    }
    const difference: number = currentTime - ConsoleUtils.lastLogTime;
    ConsoleUtils.lastLogTime = currentTime;
    return difference;
  }

  private static getInterpolatedColor(timeDifference: number): Color {
    const warnColors: Color[] = [
      { R: 46, G: 46, B: 180 },
      { R: 180, G: 82, B: 46 },
      { R: 255, G: 0, B: 0 },
    ];
    return ColorUtils.interpolate(timeDifference / 5000, ...warnColors);
  }
}

export {
  ConsoleUtils
};
