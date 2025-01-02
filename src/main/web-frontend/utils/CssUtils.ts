
type ClassItem = {
  className: string,
  include: boolean
}

export function combineClasses(classes: Array<ClassItem>): string {
  let combinedClasses = '';
  classes.forEach((value) => {
    if (value.include) {
      combinedClasses += ` ${value.className}`
    }
  })
  return combinedClasses
}