import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

export default function alert(state = initialState, action) {
  const { type, payload } = action;

  // 🪵 Debug log:
  console.log('📦 Alert Reducer Action:', type, payload);

  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
