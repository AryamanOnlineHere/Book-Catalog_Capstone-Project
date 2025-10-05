const express = require('express');
const controller = require("../controllers/admin.controller");
const { verifyToken, isAdmin } = require("../middlewares/authJwt");
const path = "/api/admin";

module.exports = (app) => {
  app.get(`${path}/users`, verifyToken, isAdmin, controller.listUsers);
  app.put(`${path}/users/:userId`, verifyToken, isAdmin, controller.updateUser);
  app.delete(`${path}/users/:userId`, verifyToken, isAdmin, controller.deleteUser);
};
