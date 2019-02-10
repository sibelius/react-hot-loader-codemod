# React Hot Loader Codemod

## Usage of RHL codemod
First you need to install jscodeshift, and then run it using our transformer
```bash
npm i -g jscodeshift

jscodeshift -t src/reactHotLoaderTransformer.ts PATH_TO_FILES
```

## Why do you need this codemod

RHL changed the hot api to be simpler (4.5.0+), from this one:

```jsx
import { hot } from 'react-hot-loader';

const Sample = () => (
  <span>ok</span>
);

export default hot(module)(Sample)
```

to this one:

```jsx
import { hot } from 'react-hot-loader/root';

const Sample = () => (
  <span>ok</span>
);

export default hot(Sample);
```

Doing find and replace in pure strings does not scale well, and can cause troubles

Using AST transformer you can make sure the code will be refactor properly.
