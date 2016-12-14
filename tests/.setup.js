require('babel-register')();

var jsdom = require('jsdom').jsdom;
global.fetch = require('node-fetch')

var exposedProperties = ['window', 'navigator', 'document'];

global.sessionStorage = storageMock()
global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

documentRef = document;

sessionStorage.setItem('user', '{"user":{"id":2,"username":"cooker","email":"cooker@me.com","first_name":"Cooker","last_name":"McStuffins","phone":"317-555-6984","created_at":"2016-12-14 09:18:11","updated_at":"2016-12-14 09:18:11"},"cooker":{"id":1,"stripe_id":"cus_9k8QV81PspDFyE","home_address":"16043 Plains Rd","home_city":"Noblesville","home_state":"IN","home_zip":"46062","home_lat":"40.021344","home_long":"-86.063042","user_id":2,"created_at":"2016-12-14 09:18:11","updated_at":"2016-12-14 09:55:15"},"driver":null}')

function storageMock() {
  var storage = {};

  return {
    setItem: function(key, value) {
      storage[key] = value || '';
    },
    getItem: function(key) {
      return storage[key] || null;
    },
    removeItem: function(key) {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key: function(i) {
      var keys = Object.keys(storage);
      return keys[i] || null;
    }
  };
}
