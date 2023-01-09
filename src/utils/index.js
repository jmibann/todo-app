const createResource = (promise) => {
  let status = 'pending';
  let result = promise.then(
    resolve => {
      status = 'success';
      result = resolve;
    },
    reject => {
      status = 'error';
      result = reject;
    }
  )

  return {
    read: () => {
      if (status === 'pending') throw result;
      if (status === 'error') throw result;
      if (status === 'success') return result;
      throw new Error('This should be impossible');
    },
  }
}

export { createResource }