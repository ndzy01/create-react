import { makeAutoObservable } from 'mobx';
import { setupStores } from '@/store/setupStores';
import { Articles } from '@/model/articles';

export class RootStore {
  loading: {
    [k: string]: boolean;
  } = { loading: false };
  setLoading: (value: boolean, key: string) => void;
  articles: Articles;

  constructor() {
    this.articles = new Articles(this);

    makeAutoObservable(this);

    this.setLoading = (value, key = 'loading') => {
      this.loading[key] = value;
    };
  }
}

export const { StoreContext, useStores, withStores } = setupStores<RootStore>(RootStore);
