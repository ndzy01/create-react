import { EditorMd } from './editor-md';
import * as React from 'react';
import Modal from '@/components/modal';
import TreeSelect from 'rc-tree-select';

const EditArticle = ({ order, title, content, id, open, setOpen, save, create, roots }: any) => {
  const [s, setS] = React.useState<Record<string, any>>({});

  React.useEffect(() => {
    setS({ title, content, order });
  }, []);

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            {!id && (
              <div>
                <label htmlFor="parentId" className="block text-sm font-medium leading-6 text-gray-900">
                  标题
                </label>
                <div className="mt-2">
                  <TreeSelect
                    showSearch
                    style={{ width: '100%' }}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="请选择父级目录"
                    allowClear
                    treeDefaultExpandAll
                    treeData={roots}
                    value={s.parentId}
                    onChange={(v) => setS({ ...s, parentId: v })}
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                标题
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="title"
                  autoComplete="title"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={s?.title}
                  onChange={(e) => setS({ ...s, title: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
                内容
              </label>
              <div className="mt-2">
                <EditorMd value={s.content} onChange={(v: string) => setS({ ...s, content: v })} />
              </div>
            </div>

            <div>
              <label htmlFor="order" className="block text-sm font-medium leading-6 text-gray-900">
                序号
              </label>
              <div className="mt-2">
                <input
                  id="order"
                  name="order"
                  type="order"
                  autoComplete="order"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={s?.order}
                  onChange={(e) => setS({ ...s, order: e.target.value })}
                />
              </div>
            </div>

            <div>
              <button
                onClick={() => {
                  if (id) {
                    save(id, { ...s, order: Number(s.order), title: String(s.title) });
                  } else {
                    create({ ...s, order: Number(s.order), title: String(s.title) });
                  }

                  setOpen(false);
                }}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditArticle;
