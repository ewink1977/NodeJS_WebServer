let products = require('../data/products.json')
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
		// Rather than using UUID as in the tutorial, I decided to create a new
		// ID based on the last item in the JSON file's ID.
		const lastItem = products[products.length - 1]
		const newId = Number(lastItem.id) + 1
		// This .toString method would usually not be necessary but the tutorial has the
		// ID fields as strings so he could use the UUID.
		const newProduct = { id: newId.toString(), ...product }
		products.push(newProduct)
		writeDataToFile('./data/products.json', products)
		resolve(newProduct)
	})
}

function update(id, product) {
	return new Promise((resolve, reject) => {
		const index = products.findIndex((p) => p.id === id)
		products[index] = { id, ...product }
		writeDataToFile('./data/products.json', products)
		resolve(products[index])
	})
}

function remove(id) {
	return new Promise((resolve, reject) => {
		products = products.filter((p) => p.id !== id)
		writeDataToFile('./data/products.json', products)
		resolve()
	})
}

module.exports = {
	findAll,
	findById,
	create,
	update,
	remove,
}
