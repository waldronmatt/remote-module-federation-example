# Remote - Module Federation Example

[![Netlify Status](https://api.netlify.com/api/v1/badges/cf6cdaa0-edc1-488b-9844-7edb469b4eeb/deploy-status)](https://app.netlify.com/sites/remote-module-federation-example/deploys)

An exposed module federated app. [Click here to see it live on Netlify](https://remote-module-federation-example.netlify.app/).

## Introduction

A portion of this stand-alone app is exposed for consumption by the host app.

Run this project alongside [the host app](https://github.com/waldronmatt/host-module-federation-example).

## Installation

Install dependencies:

        npm install

## Usage

Run dev environment:

        npm run dev

**\*\*Build for production (locally):**

        npm run build

Serve the production bundle (locally):

        npm run start

Navigate to [http://localhost:9000/](http://localhost:9000/)

\
\***\*Note**: Update public path to `http://localhost:9000/` in `webpack.production.config`

\***\*Note**: Update entry point to `./server.js` in `webpack.server.config`

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
