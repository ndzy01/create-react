import { makeAutoObservable } from 'mobx';
import { RootStore } from '@/store';
import { service } from '@/utils';

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

  async query() {
    this.setLoading(true);

    const data: any = await service({ url: '/article', method: 'GET' });

    this.updateState({ articles: data?.data || [] });

    this.setLoading(false);
  }

  async getDetail(id: string) {
    this.setLoading(true);

    const data: any = await service({ url: `/article/${id}`, method: 'GET' });

    this.updateState({ article: data?.data || {} });

    this.setLoading(false);
  }

  async save(id: string, params: any) {
    this.setLoading(true);

    await service({ url: `/article/${id}`, method: 'PATCH', data: params });

    this.getDetail(id);

    this.query();

    this.setLoading(false);
  }

  async create(params: any) {
    this.setLoading(true);

    await service({ url: '/article', method: 'POST', data: params });

    this.query();

    this.setLoading(false);
  }

  async del(id: string) {
    this.setLoading(true);

    await service({ url: `/article/${id}`, method: 'DELETE' });

    this.updateState({ article: {} });

    this.query();

    this.setLoading(false);
  }
}
