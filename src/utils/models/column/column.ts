class Column {
  constructor(
    public definition: string,
    public label: string,
    public isRowValue?: boolean,
    public rowField?: string,
  ){

  }
}

export {
  Column
}