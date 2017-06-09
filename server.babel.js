/* eslint-disable no-var, strict */
import os from 'os';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.config.dev.babel';
import appConfig from './src/config';

const ifaces = os.networkInterfaces();
const arr = [];

if (!appConfig.localDevelop) {
  Object.keys(ifaces).forEach((ifname) => {
    let alias = 0;

    ifaces[ifname].forEach((iface) => {
      if (iface.family !== 'IPv4' || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        // console.log(`${ifname}${alias} ${iface.address}`);
      } else {
        // this interface has only one ipv4 adress
        // console.log(`${ifname} ${iface.address}:${appConfig.port}`);

        arr.push(iface.address);
      }
      alias += 1;
    });
  });
}

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  ...appConfig.server,
}).listen(appConfig.port, appConfig.localDevelop ? 'localhost' : '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`
      ==> Listen port ${appConfig.port}.
      ==> Go to http://localhost:${appConfig.port}/ in your browser.
      ${arr.map(e => `
      ==> http://${e}:${appConfig.port}`)}
    `);
  }
});
