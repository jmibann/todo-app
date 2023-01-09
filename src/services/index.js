const apiURL = "https://jsonplaceholder.typicode.com/todos"

const getTodosList = async (setGlobalError) => {
  const config = {
    method: 'GET',
  };

  return window.fetch(apiURL, config)
    .then(async response => {
      if (response.status === 401) {
        return Promise.reject({
          status: 401,
          message: 'An error has occurred. Please try again.'
        });
      }
      const data = await response.json();
      return data;
    })
    .catch((error) => setGlobalError(error))
}

const updateTask = (toDo, setGlobalError) => {
  const config = {
    method: 'PUT',
    body: JSON.stringify({ ...toDo, completed: !toDo.completed }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }

  return window.fetch(`${apiURL}/${toDo.id}`, config)
    .then((response) => {
      if (response.status === 401) {
        return Promise.reject({
          status: 401,
          message: 'An error has occurred. Please try again.'
        });
      }
      return response.json()
    })
    .catch((error) => setGlobalError(error))
}


export { getTodosList, updateTask }