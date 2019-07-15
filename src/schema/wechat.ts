var mongoose = require('mongoose');
var Schema = mongoose.Schema;

  let Wechat = new Schema({
    name:  String,
    appId: String,
    appSerct:   String,
    createdAt: { type: Date, default: Date.now }
  });

  export default Wechat;

