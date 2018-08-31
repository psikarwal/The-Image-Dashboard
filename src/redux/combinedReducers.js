import { combineReducers } from 'redux';
// import post from './reducers/post';
// import addPost from './reducers/add_post';
// import deletePost from './reducers/delete_post';
// import loadPost from './reducers/load_post';
// import editPost from './reducers/edit_post';
// import comment from './reducers/comment';
// import deleteComment from './reducers/delete_comment';
// import addComment from './reducers/add_comment';
// import editComment from './reducers/edit_comment';
// import loadComment from './reducers/load_comment';
// import categoryPost from './reducers/category_post';
import selectedCategory from './reducers/selected_category';
import selectedSort from './reducers/selected_sort';

const rootReducer = combineReducers({
  selectedCategory,
  selectedSort
});

export default rootReducer;
