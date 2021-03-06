const db = require('./mysql.js');

/*
  Function Definitions
*/
const getProduct = (productId) => new Promise((resolve, reject) => {
  db.dbconnect.query(`select * from product where id= ${productId}`)
    .then((product) => {
      resolve(product.length ? product[0] : 'Product does not exist');
    })
    .catch((err) => {
      reject(err);
    });
});

const getQuantity = (productId, color, size, storeId) => new Promise((resolve, reject) => {
  const id = parseInt(storeId);
  const prodId = parseInt(productId);
  db.dbconnect.query(`select * from inventory where store_Id = ${id} and product_Id = ${prodId} and color = "${color}" and size = "${size}"`)
    .then((store) => {
      resolve(store[0].quantity);
    })
    .catch((err) => {
      reject(err);
    });
});

const getLocation = (storeId) => new Promise((resolve, reject) => {
  db.dbconnect.query(`select * from stores where id= ${storeId}`)
    .then((store) => {

      resolve(store[0]);
    })
    .catch((err) => {
      reject(err);
    });
});

const getLocationZip = (zipCode) => new Promise((resolve, reject) => {
  db.dbconnect.query(`select * from stores where zipCode= ${zipCode}`)
    .then((store) => {
      resolve(store.length ? store[0] : 'no store at this location');
    })
    .catch((err) => {
      reject(err);
    });
});

const deleteStore = (storeId) => new Promise((resolve, reject) => {
  db.dbconnect.query(`delete from inventory where store_Id= ${storeId}`)
    .then(() => db.dbconnect.query(`delete from stores where id= ${storeId}`))
    .then(() => {
      resolve(`store ${storeId} has been deleted`);
    })
    .catch((err) => {
      reject(err);
    });
});

const newStore = (store) => new Promise((resolve, reject) => {
  const storeData = [
    [store.streetAddress, store.city, store.zipCode]
  ];
  const sqlStore = 'INSERT INTO stores (streetAddress, city, zipCode) VALUES ?';
  db.dbconnect.query(sqlStore, [storeData])
    .then(() => {
      resolve(`store ${store} has been added`);
    })
    .catch((err) => {
      reject(err);
    });
});
const deleteProduct = (productId) => new Promise((resolve, reject) => {
  db.dbconnect.query(`delete from inventory where product_Id= ${productId}`)
    .then(() => db.dbconnect.query(`delete from product where id= ${productId}`))
    .then(() => {
      resolve(`store ${productId} has been deleted`);
    })
    .catch((err) => {
      reject(err);
    });
});
const newProduct = (product) => new Promise((resolve, reject) => {
  const storeData = [
    [product.name, product.price, product.size, product.color, product.numOfRatings, product.totalNumStars]
  ];
  const sqlStore = 'INSERT INTO product (name, price, size, color, numOfRatings, totalNumStars) VALUES ?';
  db.dbconnect.query(sqlStore, [storeData])
    .then(() => {
      resolve(`product ${product} has been added`);
    })
    .catch((err) => {
      reject(err);
    });

});

const updateProduct = (prodId, productData) => new Promise((resolve, reject) => {
  let queryString = 'update product set ';
  for (var key in productData) {
    if (productData.hasOwnProperty(key)) {
      queryString += `${key} = "${productData[key]}", `;
    }
  }
  let queryMinusComma = queryString.slice(0, -2);
  queryMinusComma += ` where id= ${prodId}`;
  db.dbconnect.query(queryMinusComma)
    .then(() => {
      resolve('product updated');
    })
    .catch((err) => {
      reject(err);
    });
})

module.exports.getProduct = getProduct;
module.exports.getQuantity = getQuantity;
module.exports.getLocation = getLocation;
module.exports.getLocationZip = getLocationZip;
module.exports.deleteStore = deleteStore;
module.exports.newStore = newStore;
module.exports.deleteProduct = deleteProduct;
module.exports.newProduct = newProduct;
module.exports.updateProduct = updateProduct;
