import { Column } from "../column/column";

class List<T=any> {
  rowValueColumns: Column[] = []
  otherRowColumns: Column[] = []

  constructor(
    public columns: Column[] = [],
    public pageSizeOptions: number[] = [5,10,25,50,100]
  ){}

  newColumn(definition: string, label: string, isOtherRowColumn?: boolean): Column {
    const column = new Column(definition, label, isOtherRowColumn)
    
    this.columns.push(column)
    isOtherRowColumn ?
      this.otherRowColumns.push(column):
      this.rowValueColumns.push(column) 

    return column
  }

  getDefinitions(): string[] {
    return this.columns.map((column: Column): string => column.definition)
  }
}

export {
  List
}