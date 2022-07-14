export type Note = {
  code?: string;
  desc?: string;
  input?: { key: string; value: string }[];
  output?: string;
};

export interface TreeNode {
  name: string;
  caption?: string;
  note?: Note;
  value?: string;
  children?: TreeNode[];
}

export interface FlatNode extends TreeNode {
  expandable: boolean;
  name: string;
  level: number;
  disabled: boolean;
}

export type Completion = { caption: string; value: string };

const COMMON_DATA: TreeNode[] = [];

export const BEFORE_DATA: TreeNode[] = [
  ...COMMON_DATA,
  {
    name: $localize`HTTP API request`,
    children: [
      {
        name: $localize`Set Request URL`,
        caption: 'eo.http.url.set',
        value: 'eo.http.url.set("new_url")',
        note: {
          code: 'eo.http.url.set("new_url")',
          desc: $localize`设置 HTTP API 的请求路径`,
          input: [{ key: 'new_url', value: `新的请求路径` }],
        },
      },
      {
        name: $localize`Set Header`, // 设置 Header 参数
        caption: 'eo.http.header.set',
        value: 'eo.http.header.set("param_key","param_value")',
        note: {
          code: 'eo.http.header.set("param_key","param_value")',
          desc: $localize`设置 HTTP API 的请求头部参数`,
          input: [
            { key: 'param_key', value: `参数名` },
            { key: 'param_value', value: `参数值` },
          ],
        },
      },
    ],
  },
];

export const AFTER_DATA: TreeNode[] = [
  ...COMMON_DATA,
  {
    name: $localize`HTTP API request`,
    children: [
      {
        name: $localize`Get Response Results`,
        caption: 'eo.http.response.get',
        value: 'eo.http.response.get();',
        note: {
          code: 'eo.http.response.get()',
          desc: $localize`Get the response result of the HTTP API`,
        },
      },
      {
        name: $localize`Set Response Result`,
        caption: 'eo.http.response.set',
        value: 'eo.http.response.set("response_value");',
        note: {
          code: 'eo.http.response.set("response_value")',
          desc: $localize`Set the response result of the HTTP API`,
          input: [{ key: 'response_value', value: $localize`response result` }],
        },
      },
    ],
  },
  {
    name: $localize`Custom Global Variable`,
    children: [
      {
        name: $localize`Set Global Variable`,
        caption: 'eo.globals.set',
        value: 'eo.globals.set("param_key","param_value")',
        note: {
          code: 'eo.globals.set("param_key","param_value")',
          desc: $localize`Set Global Variable`,
          input: [
            { key: 'param_key', value: $localize`parameter name` },
            { key: 'param_value', value: $localize`parameter value` },
          ],
        },
      },
      {
        name: $localize`Get global variable value`,
        caption: 'eo.globals.get',
        value: 'eo.globals.get("param_key")',
        note: {
          code: 'eo.globals.set("param_key","param_value")',
          desc: $localize`Get global variable value`,
          input: [
            { key: 'param_key', value: $localize`parameter name` },
            { key: 'param_value', value: $localize`parameter value` },
          ],
          output: $localize`Global Variable Value`,
        },
      },
      {
        name: $localize`Delete Global Variable`,
        caption: 'eo.globals.unset',
        value: 'eo.globals.unset("param_key")',
        note: {
          code: 'eo.globals.unset("param_key")',
          desc: $localize`Delete Global Variable`,
          input: [{ key: 'param_key', value: $localize`parameter name` }],
        },
      },
      {
        name: $localize`Clear All Global Variables`,
        caption: 'eo.globals.clear',
        value: 'eo.globals.clear()',
        note: {
          code: 'eo.globals.clear()',
          desc: $localize`Clear All Global Variables`,
        },
      },
    ],
  },
];

export const completions: Completion[] = AFTER_DATA.flatMap((n) => n.children).reduce((prev, curr) => {
  const { caption, value } = curr;
  if (caption) {
    prev.push({ caption, value });
  }
  return prev;
}, []);
