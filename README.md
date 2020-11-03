# react-hookful

<p align="center">

  <img alt="NPM" src="https://img.shields.io/npm/l/@react-hookful/dom?style=flat-square">

  <img alt="Codecov branch" src="https://img.shields.io/codecov/c/github/frantss/react-hookful/master?logo=codecov&style=flat-square&token=e30335a5a6a3484d9055b1e319ccc029&label=overall%20coverage">

  <img alt="CircleCI" src="https://img.shields.io/circleci/build/github/Frantss/react-hookful/master?label=master&logo=circleci&style=flat-square&token=c97c78f1040c038c4857e8bbc6ab5a4acc310455">

  <img alt="CircleCI" src="https://img.shields.io/circleci/build/github/Frantss/react-hookful/develop?label=develop&logo=circleci&style=flat-square&token=c97c78f1040c038c4857e8bbc6ab5a4acc310455">
</p>

Semantic and useful react hooks.

## Packages

| Packages                                                                   | Version                                                                |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [core](https://github.com/Frantss/react-hookful/tree/master/packages/core) | ![npm](https://img.shields.io/npm/v/@react-hookful/core?style=plastic) |
| [dom](https://github.com/Frantss/react-hookful/tree/master/packages/dom)   | ![npm](https://img.shields.io/npm/v/@react-hookful/dom?style=plastic)  |

## Contribution and Development

Although this is a personal project it is aimed to be as production ready as possible.

You may have noticed the repo is structure as a monorepo using lerna. This is so that its easier to separate hooks into different packages based on the dependencies needed.

The idea is to have the main package _@react-hookful/core_ to only be dependent on react. And create new packages for each library, e.g. _@react-hookful/redux_ for _react-redux_

If you want to contribute please follow this instructions:

- Fork the repository and make your changes
- Test all yor changes
- Create a PR to the develop branch of this repository
- After feedback is received make sure tests pass
- Complete the PR

## License

All the files in the repository are subject to the `MIT` license. Please refer to the License file at the root of the project to know more about it.
