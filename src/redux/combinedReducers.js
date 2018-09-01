import { combineReducers } from 'redux';
import selectedCategory from './reducers/selected_category';
import selectedSort from './reducers/selected_sort';
import images from './reducers/add_image';

const rootReducer = combineReducers({
  selectedCategory,
  selectedSort,
  images
});

export default rootReducer;
