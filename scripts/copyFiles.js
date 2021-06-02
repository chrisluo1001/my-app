/* eslint-disable no-console */
"use strict";
const fs = require("fs-extra");

// Copy the src/js directory from the uswds node module into the source
fs.copy("./node_modules/uswds/src/js", "./src/lib/uswds/src/js")
  .then(() => {
    console.log("Copied src/js from USWDS");
  })
  .catch(() => {
    console.err("Failed to copy src/js from USWDS, exiting");
    process.exit(1);
  });

// Copy the fonts directory from the uswds node module into the source
fs.copy("./node_modules/uswds/src/fonts", "./src/fonts")
  .then(() => {
    console.log("Copied fonts from USWDS");
  })
  .catch(() => {
    console.err("Failed to copy fonts from USWDS, exiting");
    process.exit(1);
  });

// Copy the img directory from the uswds node module into the source
fs.copy("./node_modules/uswds/src/img", "./src/img")
  .then(() => {
    console.log("Copied images from USWDS");
  })
  .catch(() => {
    console.err("Failed to copy images from USWDS, exiting");
    process.exit(1);
  });
