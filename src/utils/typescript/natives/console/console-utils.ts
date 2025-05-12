import { ColorUtils } from "@ts-extras/color/color-utils";
import { Color } from "@ts-extras/color/interfaces/color-interface";
import { GenericUtils } from "@ts-extras/generic/generic-utils";
import { Timer } from "@ts-extras/timer/timer";
import { Nullable } from "@ts-interfaces/misc-interfaces";
import { isNull, copy } from "@ts-natives/object/object-utils";
import { ConsoleOptions, ConsoleType } from "./console-interfaces";

class ConsoleUtils {
  private static lastLogTimer: Timer = new Timer();

  private static isConsoleOptions(options: any): options is ConsoleOptions {
    const keys: string[] = ['caller', 'callerLevel', 'TimeDifference', 'type'];
    if (!options || typeof options !== 'object') return false;
    const objKeys: string[] = Object.keys(options);
    if (!objKeys.every((k: string): boolean => keys.includes(k))) {
      return false;
    }
    return keys.some((key) => options.hasOwnProperty(key));
  }

  static log<Args>(options: Nullable<ConsoleOptions>, ...args: Args[]): void;
  static log(...args: any[]): void;
  static log(...args: any[]): void {
    const options: Nullable<ConsoleOptions> = ConsoleUtils.isConsoleOptions(args[0]) ? args.shift() : null;
    const logData: any[] = GenericUtils.formatLogData(args);
    const timeDifference: number = ConsoleUtils.calculateAndResetTimer();
    const { R, G, B } = ConsoleUtils.getInterpolatedColor(timeDifference);

    const logMessage: string = ConsoleUtils.buildLogMessage(options, timeDifference);
    ConsoleUtils.outputLog(options, logMessage, logData, { R, G, B });
  }

  private static calculateAndResetTimer(): number {
    const { lastLogTimer } = ConsoleUtils;
    if (isNull(lastLogTimer.startTime)) {
      lastLogTimer.start();
      return 0;
    }
    lastLogTimer.stop();
    const timeDifference: number = lastLogTimer.difference;
    lastLogTimer.start();
    return timeDifference;
  }

  private static buildLogMessage(options: Nullable<ConsoleOptions>, timeDifference: number): string {
    let logMessage: string = '\n';
    if (options) {
      if (options.TimeDifference) {
        logMessage += `%c${timeDifference}ms%c \n`;
      }
      if (options.caller) {
        let calledBy: string = GenericUtils.getCaller();
        if (options.callerLevel) {
          calledBy = GenericUtils.getCaller(options.callerLevel + 3);
        }
        logMessage += `${calledBy} \n`;
      }
    }
    return logMessage;
  }

  private static outputLog(
    options: Nullable<ConsoleOptions>,
    logMessage: string,
    logData: any[],
    color: Color
  ): void {
    const { R, G, B } = color;
    const logType: ConsoleType = options?.type || 'log';

    if (options?.TimeDifference) {
      console[logType](
        logMessage,
        `font-size:13px; background:rgb(${R},${G},${B}); color:white;`,
        '',
        ...logData
      );
    } else {
      console[logType](logMessage, ...logData);
    }
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
  ConsoleUtils,
};


const { 
  cLog,
} = copy(ConsoleUtils, 'c');



export {
  cLog,
};