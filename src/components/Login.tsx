import * as React from 'react';
import { service } from '@/utils';
import Modal from './modal';

function IconMenu(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="fixed top-4 h-8 w-8 mx-4 z-[9999]"
      fill="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fillRule="evenodd"
        fill="#c1c1c1"
        d="M53.286,243H49.857a1.715,1.715,0,0,1-1.714-1.714v-3.429a1.714,1.714,0,0,1,1.714-1.714h3.429A1.714,1.714,0,0,1,55,237.857v3.429A1.715,1.715,0,0,1,53.286,243Zm0-8.572H49.857a1.714,1.714,0,0,1-1.714-1.714v-3.428a1.715,1.715,0,0,1,1.714-1.715h3.429A1.715,1.715,0,0,1,55,229.286v3.428A1.714,1.714,0,0,1,53.286,234.428Zm0-8.571H49.857a1.714,1.714,0,0,1-1.714-1.714v-3.429A1.714,1.714,0,0,1,49.857,219h3.429A1.714,1.714,0,0,1,55,220.714v3.429A1.714,1.714,0,0,1,53.286,225.857ZM44.714,243H41.286a1.715,1.715,0,0,1-1.714-1.714v-3.429a1.714,1.714,0,0,1,1.714-1.714h3.429a1.714,1.714,0,0,1,1.714,1.714v3.429A1.715,1.715,0,0,1,44.714,243Zm0-8.572H41.286a1.714,1.714,0,0,1-1.714-1.714v-3.428a1.715,1.715,0,0,1,1.714-1.715h3.429a1.715,1.715,0,0,1,1.714,1.715v3.428A1.714,1.714,0,0,1,44.714,234.428Zm0-8.571H41.286a1.714,1.714,0,0,1-1.714-1.714v-3.429A1.714,1.714,0,0,1,41.286,219h3.429a1.714,1.714,0,0,1,1.714,1.714v3.429A1.714,1.714,0,0,1,44.714,225.857ZM36.143,243H32.714A1.715,1.715,0,0,1,31,241.286v-3.429a1.714,1.714,0,0,1,1.714-1.714h3.429a1.714,1.714,0,0,1,1.714,1.714v3.429A1.715,1.715,0,0,1,36.143,243Zm0-8.572H32.714A1.714,1.714,0,0,1,31,232.714v-3.428a1.715,1.715,0,0,1,1.714-1.715h3.429a1.715,1.715,0,0,1,1.714,1.715v3.428A1.714,1.714,0,0,1,36.143,234.428Zm0-8.571H32.714A1.714,1.714,0,0,1,31,224.143v-3.429A1.714,1.714,0,0,1,32.714,219h3.429a1.714,1.714,0,0,1,1.714,1.714v3.429A1.714,1.714,0,0,1,36.143,225.857Z"
        transform="translate(-31 -219)"
      />
    </svg>
  );
}

const Login = () => {
  const [open, setOpen] = React.useState(false);
  const [mobile, setMobile] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <Modal open={open} setOpen={setOpen} renderTrigger={<IconMenu />}>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium leading-6 text-gray-900">
                手机号
              </label>
              <div className="mt-2">
                <input
                  id="mobile"
                  name="mobile"
                  type="mobile"
                  autoComplete="mobile"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  密码
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                onClick={() => {
                  service({ url: '/user/login', method: 'POST', data: { mobile, password } }).then((res) => {
                    if (res && res?.data?.token) {
                      localStorage.setItem('token', res?.data?.token);

                      setOpen(false);
                    }
                  });
                }}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                登录
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Login;
