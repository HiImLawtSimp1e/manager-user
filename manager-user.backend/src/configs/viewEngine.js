import express from "express";

const configViewEngine = (app) => {
  //register static folder address
  app.use(express.static("./src/public"));
  //register template ejs
  app.set("view engine", "ejs");
  //register view folder address
  app.set("views", "./src/views");
};

export default configViewEngine;
