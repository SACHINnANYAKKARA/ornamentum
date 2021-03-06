import { ExampleFile, FileType } from 'helper-models';

export const itemsUsage: ExampleFile[] = [
  {
    type: FileType.TS,
    name: 'items-usage.component.ts',
    content: require('!!raw-loader!./example/items-usage/items-usage.component.ts')
  },
  {
    type: FileType.HTML,
    name: 'items-usage.component.html',
    content: require('!!raw-loader!./example/items-usage/items-usage.component.html')
  },
  {
    type: FileType.TS,
    name: 'items-usage.module.ts',
    content: require('!!raw-loader!./example/items-usage/items-usage.module.md')
  }
];

export const dataSourceUsage: ExampleFile[] = [
  {
    type: FileType.TS,
    name: 'data-source-usage.component.ts',
    content: require('!!raw-loader!./example/data-source-usage/data-source-usage.component.ts')
  },
  {
    type: FileType.HTML,
    name: 'data-source-usage.component.html',
    content: require('!!raw-loader!./example/data-source-usage/data-source-usage.component.html')
  },
  {
    type: FileType.TS,
    name: 'data-source-usage.module.ts',
    content: require('!!raw-loader!./example/data-source-usage/data-source-usage.module.md')
  }
];

export const demoSnippet: any = {
  items: require('!!raw-loader!./docs/items.md'),
  dataSource: require('!!raw-loader!./docs/data-source.md')
};
