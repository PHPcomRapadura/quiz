/* eslint-disable */
export function final () {
  // @ts-ignore
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.writable = false
  }
}
