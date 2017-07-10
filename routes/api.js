const express = require('express');
const out = require('../utils/out');

module.exports = (adminService, userService) => {
   const router = express.Router();

   router.post('/admin/product', (req, res) => {
       adminService.addProduct(req, res).then((message) => {
           out.send(req, res, message, 200)
       })
   }) 

   return router;
}