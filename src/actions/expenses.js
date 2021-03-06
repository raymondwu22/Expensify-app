// import uuid from 'uuid';
import database from '../firebase/firebase';

// component calls action generator
// action generator returns object
// component dispatches object
// redux store changes

// ADD_EXPENSE
export const addExpense = expense => ({
  type: 'ADD_EXPENSE',
  expense,
});

// allowed because of redux thunk -- Create our data
export const startAddExpense = (expenseData = {}) => (dispatch, getState) => {
  const { uid } = getState().auth;
  const { description = '', note = '', amount = 0, created = 0 } = expenseData;

  const expense = {
    description,
    note,
    amount,
    created,
  };

  return database
    .ref(`/users/${uid}/expenses`)
    .push(expense)
    .then(ref => {
      dispatch(
        addExpense({
          id: ref.key,
          ...expense,
        })
      );
    });
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id,
});

export const startRemoveExpense = ({ id } = {}) => (dispatch, getState) => {
  const { uid } = getState().auth;

  return database
    .ref(`users/${uid}/expenses/${id}`)
    .remove()
    .then(() => {
      dispatch(removeExpense({ id }));
    });
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
});

export const startEditExpense = (id, updates) => (dispatch, getState) => {
  const { uid } = getState().auth;

  return database
    .ref(`/users/${uid}/expenses/${id}`)
    .update(updates)
    .then(() => {
      dispatch(editExpense(id, updates));
    });
};

// SET_EXPENSES
export const setExpenses = expenses => ({
  type: 'SET_EXPENSES',
  expenses,
});

export const startSetExpenses = () => (dispatch, getState) => {
  const { uid } = getState().auth;
  // 1. fetch all expense data
  return database
    .ref(`/users/${uid}/expenses`)
    .once('value')
    .then(snapshot => {
      // 2. parse all data into array
      const expeneses = [];

      snapshot.forEach(item => {
        expeneses.push({
          id: item.key,
          ...item.val(),
        });
      });
      // 3.dispatch SET_EXPENSES
      dispatch(setExpenses(expeneses));
    });
};
