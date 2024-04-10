import * as React from 'react';

type Constructor<T = any> = new (...args: any[]) => T;

export const setupStores = <T,>(RootStore: Constructor) => {
  const rootStore = new RootStore();

  const StoreContext = React.createContext<{
    state: T;
  }>({ state: rootStore });

  const useStores = () => {
    const { state } = React.useContext(StoreContext);

    return state;
  };

  const withStores: any = (Children: any) => {
    const EnhancedComponent = (props: Record<string, any>) => {
      return (
        <StoreContext.Provider value={{ state: rootStore }}>
          <Children {...props} />
        </StoreContext.Provider>
      );
    };

    return EnhancedComponent;
  };

  return { useStores, withStores, StoreContext };
};
