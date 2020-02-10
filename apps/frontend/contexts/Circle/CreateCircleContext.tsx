import CircleSelector from './CircleSelector';
import React from 'react';
import { ProviderStore } from './createCircleContextTypes';

export const CreateCircleContext = React.createContext({} as ProviderStore);

const CreateCircleProvider = ({ children }: any) => {
  return (
    <CreateCircleContext.Provider value={{}}>
      <CircleSelector />
    </CreateCircleContext.Provider>
  );
};

const CreateCircleConsumer = CreateCircleContext.Consumer;

export { CreateCircleProvider, CreateCircleConsumer };
