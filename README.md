# NOWPASS Chrome Extension

> Please note that NOWPASS is currently in an early alpha stage.

This is the Google Chrome extension of the NOWPASS Open Source password manager. It also works with Chromium, Vivaldi and Opera.

## Installation Instructions

Once published, you are going to be able to also install the release version from the [Chrome Web Store](https://chrome.google.com/webstore/detail/nowpass-password-manager/cjpobjdihgffjlpdnnhmggckbehbmfap) (Currently only for testers)

## Development

### Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

#### Prerequisites

Clone the project and install all dependencies needed to run the application.

```
git clone --depth 1 https://github.com/nowpass/chrome-extension
```

#### Installing

After checking out the repository, you first have to install all needed dependencies.

```
cd vue-frontend
npm install
```

Follow the normal "installation" of an development extension, pointing Chrome to the ```/extension``` folder.

### Running the Extension

The extension is written mostly in JavaScript ES6 (ES2015) standard, in order to run it as an extension the JavaScript code 
needs to be translated (transpiled) in an chrome supported version. (/src to /extension)
For the import of modules webpack is used. 

```
npm start
```

This starts the build job as watcher (repack on every file change in the /src folder) for the `background.min.js` and `contentet-script.min.js`

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/nowpass/chrome-extension/tags). 

## License

This project is licensed under the GPLv3 License - see the [LICENSE.md](LICENSE.md) file for details
