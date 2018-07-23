type TResolveOptionItem = string | boolean | ((name: string) => string)
const defaultSuccessDecoration = 'Success'
const defaultFailureDecoration = 'Failure'

export interface IResolveOptions {
  success?: TResolveOptionItem
  failure?: TResolveOptionItem
}

const generateOptionItem = (
  item: TResolveOptionItem,
  defaultItem: string,
): TResolveOptionItem => {
  if(item === true || typeof item === 'undefined' ){return (name) => (`${name}${defaultItem}`)}
  if(typeof item === 'string'){return () => (item)}
  if(item === false){return}
  if(typeof item === 'function'){
    return item
  }
}

const generateOptions = (
  options: IResolveOptions,
  runOptions: IResolveOptions,
  paramOptions: IResolveOptions,
): IResolveOptions => {
  const {
    success = runOptions.success || options.success,
    failure = runOptions.success || options.success,
  } = paramOptions
  return {
    success: generateOptionItem(success, defaultSuccessDecoration),
    failure: generateOptionItem(failure, defaultFailureDecoration),
  }
}

const generateName = (operator: TResolveOptionItem, name: string) => {
  if(typeof operator === 'string'){
    return `${name}${operator}`
  }
  if(typeof operator === 'function'){
    return operator(name)
  }
}

const kegResolve = (options: IResolveOptions = {}) => () => {
  return (context: any, payload: any, runOptions: IResolveOptions = {}) => {
    return (
      resolve: Promise<any>,
      _success: string | IResolveOptions | TResolveOptionItem,
      _failure: string | TResolveOptionItem): Promise<any> => {
      if(!options && !runOptions){return}
      const paramOptions: IResolveOptions = typeof _success === 'object' ? _success : {
        success: _success,
        failure: _failure,
      }
      const {
        success,
        failure,
      } = generateOptions(options, runOptions, paramOptions)
      return new Promise((outResolve?: any, outReject?: any) => {
        resolve.then((result) => {
          if(success){
            context.commit(generateName(success, context.name), result)
          }
          outResolve(result)
        }).catch((error) => {
          if(failure){
            context.commit(generateName(failure, context.name), error)
          }
          outReject(error)
        })
      })
    }
  }
}

export default kegResolve
