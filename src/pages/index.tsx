import { observer } from 'mobx-react-lite';
import { useStores } from '@/store';
import { useEffect, useState } from 'react';
import * as React from 'react';
import EditArticle from './components/edit-article';
import { EditorMd } from './components/editor-md';
import RCTree from 'rc-tree';
import 'rc-tree/assets/index.css';
import Modal from '@/components/modal';

const loop = (arr: any[]): any[] => {
  return [...arr]
    .sort((a, b) => a.order - b.order)
    .map((item) => {
      const newItem = { ...item, key: item.id, label: item.title, value: item.id };

      if (Array.isArray(item.children) && item.children.length > 0) {
        newItem.children = loop(item.children);
      } else {
        delete newItem.children;
      }

      return newItem;
    });
};

export const Home = observer(() => {
  const [open, setOpen] = useState(false);
  const [v, setV] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const {
    loading,
    articles: {
      state: { articles, article },
      query,
      getDetail,
      updateState,
      save,
      create,
      del,
    },
  } = useStores();

  useEffect(() => {
    query();
  }, []);

  return (
    <div className="mt-16">
      <button
        className="mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          setV(true);
        }}
      >
        {article?.title || '请选择文章'}
      </button>
      <button
        className="mx-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        onClick={() => {
          updateState({ article: {} });
          setOpen(true);
        }}
      >
        新增
      </button>
      <button
        className="mx-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        onClick={() => {
          if (!article.id) {
            return;
          }

          setOpen(true);
        }}
      >
        编辑
      </button>
      <button
        className="mx-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        onClick={() => {
          if (!article.id) {
            return;
          }

          del(article.id);

          setSelectedKeys([]);
        }}
      >
        删除
      </button>

      <EditorMd
        type="view"
        value={article?.content}
        onChange={(v: string) => {
          updateState({ article: { ...article, content: v } });
        }}
      />

      {open && (
        <EditArticle setOpen={setOpen} {...article} open={open} save={save} create={create} roots={loop(articles)} />
      )}

      {v && (
        <Modal open={v} setOpen={setV}>
          <RCTree
            showLine
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            treeData={loop(articles)}
            selectedKeys={selectedKeys}
            onSelect={(keys: any) => {
              setSelectedKeys(keys);
              if (keys.length) {
                getDetail(keys[0]);
              } else {
                updateState({ article: {} });
              }
              setV(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
});
