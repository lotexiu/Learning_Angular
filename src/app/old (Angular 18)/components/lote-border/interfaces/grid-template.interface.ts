interface GridDimension {
  defaultSize?: string
  size?: string[] 
  gap?: string
}

interface GridConfig {
  row?: GridDimension
  column?: GridDimension
}

export {
  GridConfig,
  GridDimension
}