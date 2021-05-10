const Product = require('../models/productModel')

const { getPostData } = require('../utils')

// @DESC GETS ALL PRODUCTS
// @ROUTE GET /api/products
async function getProducts(req, res) {
	try {
		const products = await Product.findAll()

		res.writeHead(200, { 'Content-Type': 'application/json' })
		res.end(JSON.stringify(products))
	} catch (error) {
		console.error(error)
	}
}

// @DESC GETS SINGLE PRODUCT
// @ROUTE GET /api/products/:id
async function getProduct(req, res, id) {
	try {
		const product = await Product.findById(id)

		if (!product) {
			res.writeHead(404, { 'Content-Type': 'application/json' })
			res.end(JSON.stringify({ message: 'Product Not Found, jerk.' }))
		} else {
			res.writeHead(200, { 'Content-Type': 'application/json' })
			res.end(JSON.stringify(product))
		}
	} catch (error) {
		console.error(error)
	}
}

// @DESC CREATES A PRODUCT
// @ROUTE POST /api/products
async function createProduct(req, res) {
	try {
		const body = await getPostData(req)

		const { title, description, price } = JSON.parse(body)

		const product = {
			title,
			description,
			price,
		}

		const newProduct = await Product.create(product)

		res.writeHead(201, { 'Content-Type': 'application/json' })
		return res.end(JSON.stringify(newProduct))
	} catch (error) {
		console.error(error)
	}
}

// @DESC UPDATES A PRODUCT
// @ROUTE PUT /api/products/:id
async function updateProduct(req, res, id) {
	try {
		const product = await Product.findById(id)

		if (!product) {
			res.writeHead(404, { 'Content-Type': 'application/json' })
			res.end(JSON.stringify({ message: 'Product Not Found, jerk.' }))
		} else {
			const body = await getPostData(req)

			const { title, description, price } = JSON.parse(body)

			const productData = {
				title: title || product.title,
				description: description || product.description,
				price: price || product.price,
			}

			const updProduct = await Product.update(id, productData)

			res.writeHead(200, { 'Content-Type': 'application/json' })
			return res.end(JSON.stringify(updProduct))
		}
	} catch (error) {
		console.error(error)
	}
}

// @DESC DELETES SINGLE PRODUCT
// @ROUTE DELETE /api/products/:id
async function deleteProduct(req, res, id) {
	try {
		const product = await Product.findById(id)

		if (!product) {
			res.writeHead(404, { 'Content-Type': 'application/json' })
			res.end(JSON.stringify({ message: 'Product Not Found, jerk.' }))
		} else {
			await Product.remove(id)
			res.writeHead(200, { 'Content-Type': 'application/json' })
			res.end(JSON.stringify({ message: `Product ${id} removed, jerk!` }))
		}
	} catch (error) {
		console.error(error)
	}
}

module.exports = {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
}
