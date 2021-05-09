const products = require('../data/products.json')
const { writeDataToFile } = require('../utils')

function findAll() {
	return new Promise((resolve, reject) => {
		resolve(products)
	})
}

function findById(id) {
	return new Promise((resolve, reject) => {
		const product = products.find((p) => p.id === id)
		resolve(product)
	})
}

function create(product) {
	return new Promise((resolve, reject) => {
		const lastItem = products[products.length - 1]
		const newId = Number(lastItem.id) + 1
		const newProduct = { id: newId, ...product }
		products.push(newProduct)
		writeDataToFile('./data/products.json', products)
		resolve(newProduct)
	})
}

module.exports = {
	findAll,
	findById,
	create,
}
