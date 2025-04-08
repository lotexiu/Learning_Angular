class Class<T> {
  constructor(init: Partial<T>) {
    Object.assign(this, init);
  }
}

export {
  Class
}