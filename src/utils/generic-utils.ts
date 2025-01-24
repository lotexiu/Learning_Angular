class GenericUtils {

  static asyncSleep(ms: number): Promise<void> {
    return new Promise((resolve: any) => setTimeout(resolve, ms));
  }

  static sleep(ms: number): void {
    const end = Date.now() + ms;
    while (Date.now() < end) { }
  }
}

const {
  asyncSleep,
  sleep,
} = GenericUtils;

export {
  GenericUtils,
  asyncSleep,
  sleep,
}