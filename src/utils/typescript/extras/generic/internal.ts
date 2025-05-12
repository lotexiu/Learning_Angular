function asyncSleep(ms: number): Promise<void> {
  return new Promise((resolve: any) => setTimeout(resolve, ms));
}

function sleep(ms: number): void {
  const end = Date.now() + ms;
  while (Date.now() < end) { }
}

function getCaller(level: number = 3): string {
  let caller: string = (new Error().stack?.split('\n') || ['', ''])[level]
    .replace(/[ ]+at _[A-Za-z]+\./, '');
  if (caller.match(/[ ]+at .+/)) {
    caller = `unknown (${caller.split('at ')[1]})`;
  }
  return caller;
}

function formatLogData(args: any[]): any[] {
  let data: any[] = [];
  args.forEach((arg: any) => {
    data.push(arg);
    data.push('\n');
  });
  return data;
}

function As<T=any>(value: any): T {
  return value;
}

export const _Generic = {
  asyncSleep,
  sleep,
  getCaller,
  formatLogData,
  As,
};
