import { RootStore } from '@/store';
import { makeAutoObservable } from 'mobx';

interface State {
  articles: any[];
  article: Record<string, any>;
}

export class Articles {
  setLoading: (value: boolean, key?: string) => void;
  updateState: (data: Partial<State>) => void;
  resetState: (data: Partial<State>) => void;
  state: State = {
    articles: [],
    article: {},
  };

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.setLoading = (value: boolean, key = 'articles') => {
      rootStore.setLoading(value, key);
    };

    this.resetState = (data) => {
      this.state = { ...this.state, ...data };
    };

    this.updateState = (data) => {
      this.state = { ...this.state, ...data };
    };
  }
}
