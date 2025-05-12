import { _Generic } from "./internal";
import { RegistryUtils } from "@ts-extras/registry/registry-utils";

class GenericUtils {

  static asyncSleep(ms: number): Promise<void> {
    return _Generic.asyncSleep(ms);
  }

  static sleep(ms: number): void {
    return _Generic.sleep(ms);
  }

  static getCaller(level: number = 3): string {
    return _Generic.getCaller(level);
  }

  static formatLogData(args: any[]): any[] {
    return _Generic.formatLogData(args);
  }

  static As<T=any>(value: any): T {
    return _Generic.As<T>(value);
  }
  
}

export {
  GenericUtils,
}

const {
  As
} = GenericUtils

export {
  As
}

RegistryUtils.getOrAddRegistryClass(GenericUtils);