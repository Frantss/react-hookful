# react-hookful

Useful and generic react hooks.

## Packages

| Packages                                                                                     | Version                                                              |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| [react-hookful](https://github.com/Frantss/react-hookful/tree/master/packages/react-hookful) | ![npm](https://img.shields.io/npm/v/react-hookful?style=flat-square) |

## Contribution and Development

Although this is a personal project it is aimed to be as production ready as possible.

You may have noticed the repo is structure as a monorepo using lerna. This is so that its easier to separate hooks into different packages based on the dependencies needed.

The idea is to have the main package _react-hookful_ to only be dependent on react. And create new packages for each library, e.g. _react-hookful-redux_ for _react-redux_

If you want to contribute please follow this instructions:

- Fork the repository and make your changes
- Test all yor changes
- Create a PR to the develop branch of this repository
- After feedback is received make sure tests pass
- Complete the PR

## License

All the files in the repository are subject to the MIT license. Please refer to the License file at the root of the project to know more about it.
