import express from 'express'
import { getDb } from '../data/database.js'

const db = getDb()

// Search by name
async function searchQuery(req, res){
    let query = req.query.q
    let sort = req.query.sort
    let order = req.query.order

    let searchValue

    if (!query) {
        return res.status(400).send("Ingen query string")
    } else if (query) {

        await db.read();

        searchValue = db.data.products.filter((product) => product.name.toLowerCase().includes(query))

        if (!searchValue) {
            return res.status(404).send("Produkten finns ej!")
        }

        if (query && sort && order) {
            searchQueryWithSortOptions(searchValue, sort, order, res)
        } else {
            console.log('Har inte applicerat sorterings & ordneringsval, visar: ', searchValue);
            res.status(200).send(searchValue)
        }
    }
}

function searchQueryWithSortOptions(searchValue, sort, order, res) {

    let orderOption

    if (sort === 'name') {
        return sortByName(searchValue, order, orderOption, res)
    } else if (sort === 'price') {
       return sortByPrice(searchValue, order, orderOption, res)
    } else {
        return res.status(400).send("Ogilltig sorteringsval")
    }
}

async function sortByName(searchValue, order, orderOption, res) {

        if (order === 'asc') {
             orderOption = searchValue.sort((a, b) => a.name.localeCompare(b.name))
        } else if (order === 'desc') {
             orderOption = searchValue.sort((a, b) => b.name.localeCompare(a.name))
        } else {
            return res.status(400).send("Ogilltig ordningsval")
        }
        console.log('7. Order grejs: ', orderOption, order)
         return res.status(200).send(orderOption)
}

async function sortByPrice(searchValue, order, orderOption, res) {

        if (order === 'asc') {
            orderOption = searchValue.sort((a, b) => a.price - b.price)
        } else if (order === 'desc') {
            orderOption = searchValue.sort((a, b) => b.price - a.price)
        }  else {
            return res.status(400).send("Ogilltig ordningsval")
        }
    return res.status(200).send(orderOption)
}
export default searchQuery;
