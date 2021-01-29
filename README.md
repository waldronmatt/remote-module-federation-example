# Remote - Module Federation Example

An exposed module federated app. [Click here to see it live on Netlify](https://remote-module-federation-example.netlify.app/).

[![Netlify Status](https://api.netlify.com/api/v1/badges/cf6cdaa0-edc1-488b-9844-7edb469b4eeb/deploy-status)](https://app.netlify.com/sites/remote-module-federation-example/deploys)

Run this project alongside [the host app](https://github.com/waldronmatt/host-module-federation-example).

## Installation

Install dependencies:

        npm install

Run dev environment:

Navigate to [http://localhost:9000/](http://localhost:9000/).

        npm run dev

Build for production (locally)

Note: Update public path to `http://localhost:9000/` in `webpack.production.config`
Note: Update entry point to `./server.js` in `webpack.server.config`

        npm run build

Serve the production bundle (locally)

        npm run start

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
