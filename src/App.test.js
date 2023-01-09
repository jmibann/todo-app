/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen, fireEvent, waitFor, act} from '@testing-library/react';

import { Provider } from 'react-redux';
import store from './store/store';

import App from './App';
import * as todosAPI from './services'; 

const TEST_USER = "TEST_USER";
const TEST_PASS = "TEST_PASS";

const TASK_0 = { userId: 1, id: 1, title: "Task 1", completed: false }; 
const MOCK_TASKS = [
  TASK_0,
  { userId: 1, id: 2, title: "Task 2", completed: true },
];

const localStorageMock = () => {
  let store = {};
  return ({
    getItem: (key) => store[key],
    setItem: (key, value) => store[key] = value,
    removeItem: (key) => delete store[key], 
  });
};

const Wrapper = ({ children }) => (
  <Provider store={store}>
    { children }
  </Provider>
) 

beforeAll(() => {
  Object.defineProperty(window, 'localStorage', { value: localStorageMock() });
});

jest.mock('./services');

beforeEach(() => {
  todosAPI.getTodosList.mockResolvedValueOnce(Promise.resolve(MOCK_TASKS));
})

describe("Renders To Do Apps", () => {
  it("Should render login screen", async () => {
    render(<App />, { wrapper: Wrapper });
  
    expect(screen.getByText(/user/i)).toBeInTheDocument();
    expect(screen.getByText(/password/i)).toBeInTheDocument();

    const userInput = screen.getByLabelText(/user/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(userInput, {target:{ value: TEST_USER }});
    fireEvent.change(passwordInput, {target:{ value: TEST_PASS }});
    fireEvent.click(screen.getByText(/Log In/i));
    
    await waitFor(() => {
      expect(screen.getByText(/Log out/i)).toBeInTheDocument();
    });
  });

  it("Should persist session", async () => {
    render(<App />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.getByText(/Log out/i)).toBeInTheDocument();
    });
  });

  it("List done and undone tasks", async () => {
    todosAPI.updateTask.mockResolvedValueOnce(Promise.resolve(
      {...TASK_0, completed: true }
    ));

    render(<App />, { wrapper: Wrapper });

    expect(await screen.findByText(/uncompleted tasks/i)).toBeInTheDocument();
    expect(screen.getByText(/Task 1/i)).toBeInTheDocument();
    
    expect(await screen.findByText('Completed Tasks')).toBeInTheDocument();
    expect(screen.getByText(/Task 2/i)).toBeInTheDocument();

    const actionIcons = screen.getAllByTestId('action-icon');
    expect(actionIcons.length).toBe(2);

    const markAsDone = actionIcons[0];
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      fireEvent.click(markAsDone);
    });

    const undoneTasksColumn = screen.getByTestId('table-container').children[0];
    const doneTasksColumn = screen.getByTestId('table-container').children[1];
    
    expect(undoneTasksColumn.children.length).toBe(1);
    expect(doneTasksColumn.children.length).toBe(3);
  });

  it("Should log out", async () => {
    render(<App />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.getByText(/log out/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/log out/i));
  });
})
