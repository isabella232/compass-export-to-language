import { addInputQuery, toggleModal, setNamespace, runQuery } from 'modules/export-query';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from 'modules';

/**
 * Configure the store for use.
 *
 * @param {Object} options - The options.
 *
 * @returns {Store} The store.
 */
const configureStore = (options = {}) => {
  const store = createStore(reducer, applyMiddleware(thunk));

  if (options.localAppRegistry) {
    const localAppRegistry = options.localAppRegistry;
    localAppRegistry.on('open-aggregation-export-to-language', (aggregation) => {
      store.dispatch(toggleModal(true));
      store.dispatch(setNamespace('Pipeline'));
      store.dispatch(runQuery('python', aggregation));
      store.dispatch(addInputQuery(aggregation));
    });

    localAppRegistry.on('open-query-export-to-language', (query) => {
      store.dispatch(toggleModal(true));
      store.dispatch(setNamespace('Query'));
      store.dispatch(runQuery('python', query));
      store.dispatch(addInputQuery(query));
    });
  };

  return store;
};

export default configureStore;
