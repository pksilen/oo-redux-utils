import createNamespacedReducers from '../src/createNamespacedReducers';

describe('createNamespacedReducers', () => {
  it('should create namespaced reducers for each given namespace', () => {
    // GIVEN
    const namespaces = { namespace1: 'namespace1', namespace2: 'namespace2' };
    const createReducer = jest.fn();
    const reducer = (initialState, action) => initialState;
    createReducer.mockReturnValue(reducer);

    // WHEN
    const namespacedReducers = createNamespacedReducers(namespaces, createReducer);

    // THEN
    expect(namespacedReducers).toStrictEqual({ namespace1: reducer, namespace2: reducer });
  });
});
