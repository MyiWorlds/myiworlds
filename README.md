## Importing one of your packages

```
npx lerna add @yourproject/common
```

If your node modules are not "hoisted" up to the top level (this breaks the nice import style) then you will need to run this command.
Note: Run in root directory, not one of the packages

```
npm run fix
```

or

```
npm run bootstrap
```

Other Lerna tips here:
https://michalzalecki.com/solve-code-sharing-and-setup-project-with-lerna-and-monorepo/
