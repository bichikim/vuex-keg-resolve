interface IOptions {
  success?: string
  failure?: string
}

const kegResolve = (options: IOptions = {}) => () => {
  const {success = 'Success', failure = 'Failure'} = options
  return (context: any) => {
    return (resolve: Promise<any>): Promise<any> => {
      return new Promise((outResolve, outReject) => {
        resolve.then((result) => {
          context.commit(`${context.name}${success}`, result)
          outResolve(result)
        }).catch((error) => {
          context.commit(`${context.name}${failure}`, error)
          outReject(error)
        })
      })

    }
  }
}

export default kegResolve