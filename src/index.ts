type TResolveOptionItem = string | boolean | ((name: string) => string)
const defaultSuccessDecoration = 'Success'
const defaultFailureDecoration = 'Failure'

export interface IResolveOptions {
  success?: TResolveOptionItem | TResolveOptionItem[]
  failure?: TResolveOptionItem | TResolveOptionItem[]
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

const resolveOptions = (
  options: IResolveOptions,
  runOptions: IResolveOptions,
  paramOptions: IResolveOptions,
): IResolveOptions => {
  const {
    success = runOptions.success || options.success,
    failure = runOptions.success || options.success,
  } = paramOptions
  return {
    success,
    failure,
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


export type TKegResolvePluginRunner = (
  resolve: Promise<any> | any,
  success: string | TResolveOptionItem | TResolveOptionItem[],
  failure?: string | TResolveOptionItem | TResolveOptionItem[],
) => Promise<any>

const kegResolve = (options: IResolveOptions = {}) => () => {
  return (context: any, payload: any, runOptions: IResolveOptions = {}):
  TKegResolvePluginRunner => {
    return async (
      resolve: Promise<any> | any,
      _success: string | IResolveOptions | TResolveOptionItem | TResolveOptionItem[],
      _failure?: string | TResolveOptionItem | TResolveOptionItem[]): Promise<any> => {
      if(!options && !runOptions){return}
      const paramOptions: IResolveOptions =
        typeof _success === 'object' && !Array.isArray(_success) ? _success : {
          success: _success,
          failure: _failure,
        }
      const {
        success,
        failure,
      } = resolveOptions(options, runOptions, paramOptions)
      const commit = (
        success: TResolveOptionItem,
        defaultDecoration: string,
        value: any
      ) => {
        context.commit(generateName(
          generateOptionItem(success, defaultDecoration),
          context.name
        ), value)
      }

      let result: any
      try{
        result = await resolve
        if(Array.isArray(success)){
          success.forEach((oneOfSuccess) => {
            commit(oneOfSuccess, defaultSuccessDecoration, result)
          })
        }else{
          commit(success, defaultSuccessDecoration, result)
        }
        return result
      }catch(error){
        if(Array.isArray(failure)){
          failure.forEach((oneOfFailure) => {
            commit(oneOfFailure, defaultFailureDecoration, error)
          })
        }else{
          commit(failure, defaultFailureDecoration, error)
        }
        throw error
      }
    }
  }
}

export default kegResolve
