let defaultState = {
  selectedItems: { items: [], restaurantName: '' },
}

let cartReducer = (state = defaultState, action) => {
  let newState
  switch (action.type) {
    case 'ADD_TO_CART':
      newState = { ...state }

      newState.selectedItems = {
        items: [...newState.selectedItems.items, action.payload.item],
        restaurantName: action.payload.restaurantName,
      }
      return newState

    case 'REMOVE_FROM_CART':
      newState = {
        selectedItems: {
          items: [
            ...state.selectedItems.items.filter(
              (item) => item.title !== action.payload.title
            ),
          ],
          restaurantName: action.payload.restaurantName,
        },
      }
      return newState

    default:
      return state
  }
}

export default cartReducer
