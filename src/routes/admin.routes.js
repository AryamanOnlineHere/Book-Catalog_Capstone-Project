const express = require('express');
const controller=require("../controllers/admin.controller")
const path="/api/admin";

module.exports = (app) => {
    app.get(`${path}/users`,controller.listUsers);
    app.put(`${path}/users/:userId`,controller.updateUser);
    app.delete(`${path}/users/:userId`,controller.deleteUser);
};