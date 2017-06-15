
var fs       = require("fs");
var myroutes = {};

myroutes.homePage = function(req, res) {
  var homePage = "homePage/"+req.params.name;
  try {
      res.send(homePage);
  }
  catch(err) {
      console.log('Server error:', err);
  }
};
module.exports = myroutes;


     