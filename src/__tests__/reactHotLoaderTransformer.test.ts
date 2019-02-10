import { defineTest } from '../../test/testUtils';

const defineTestRHL = (name: string, only: boolean = false) => defineTest(__dirname, 'reactHotLoaderTransformer', null, name, only);

describe('reactHotLoaderTransformer', () => {
  defineTestRHL('HotModule');
});
