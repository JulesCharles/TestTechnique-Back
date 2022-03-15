const express = require('express')
const mysql = require('../config/db')

const router = express.Router()

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM perso'
  mysql.query(sql, (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving data from database')
    } else {
      res.status(200).json(result)
    }
  })
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  console.log('----- id -----', id)
  const sql = `SELECT * FROM perso WHERE id = ?, ?`
  mysql.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving data from database')
    } else {
      res.status(200).json(result)
    }
  })
})

router.post('/', (req, res) => {
  const {
    nom,
    prenom,
    date_naissance,
    adresse,
    cp,
    ville,
    pays,
    immatriculation,
    date_circulation,
    marque,
    modele,
    type_vehicule,
  } = req.body

  let datas = [
    nom,
    prenom,
    date_naissance,
    adresse,
    cp,
    ville,
    pays,
    immatriculation,
    date_circulation,
    marque,
    modele,
    type_vehicule,
  ]
  let sql =
    'INSERT INTO perso ( nom, prenom, date_naissance, adresse, cp, ville, pays, immatriculation, date_circulation, marque, modele, type_vehicule) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  let sql2 = 'SELECT * FROM perso WHERE immatriculation = ?'
  mysql.query(sql2, req.body.immatriculation, (err, result) => {
    if (err) {
      res.status(500).send(err)
    } else if (result.length) {
      res.status(409).send(`${req.body.immatriculation} existe déjà`)
    } else {
      mysql.query(sql, datas, (error, resu) => {
        if (error) {
          res.status(500).send(error)
        } else {
          const id = resu.insertId
          const createdCar = [id, ...datas]
          res.status(200).json(createdCar)
        }
      })
    }
  })
})

module.exports = router
