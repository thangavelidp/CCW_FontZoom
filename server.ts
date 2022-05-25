import "zone.js/dist/zone-node";

import "localstorage-polyfill";

import * as express from "express";
import { join } from "path";
import { REQUEST, RESPONSE } from "@nguniversal/express-engine/tokens";

// Express server
export const app = express();
global["localStorage"] = localStorage;

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), "dist/browser");

// const domino = require('domino');
// const fs = require('fs');
// const path = require('path');
// const template = fs.readFileSync(path.join(__dirname, '.', 'dist', 'index.html')).toString();
// const win = domino.createWindow(template);
// global['window'] = win;
// global['document'] = win.document;

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP,
  ngExpressEngine,
  provideModuleMap
} = require("./dist/server/main");

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine("html", (_, options, callback) => {
  if (options.hasOwnProperty("req")) {
    let engine = ngExpressEngine({
      bootstrap: AppServerModuleNgFactory,
      providers: [provideModuleMap(LAZY_MODULE_MAP)]
    });
    engine(_, options, callback);
  } else {
    let engine = require("ejs").renderFile;
    engine(_, options, callback);
  }
});

app.set("view engine", "html");
app.set("views", DIST_FOLDER);

// Example Express Rest API endpoints
app.get(
  "*.*",
  express.static(DIST_FOLDER, {
    maxAge: "1y"
  })
);

// All regular routes use the Universal engine
app.get("*", (req, res) => {
  res.render("index", {
    req: req,
    res: res,

    providers: [
      {
        provide: REQUEST,
        useValue: req
      },
      {
        provide: RESPONSE,
        useValue: res
      }
    ]
  });
});
