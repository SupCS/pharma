const express = require('express');
const Pharmacy = require('../models/Pharmacy');
const Product = require('../models/Product');
const Order = require('../models/Order');

const router = express.Router();

// Отримання списку всіх аптек
router.get('/', async (req, res) => {
    try {
    const pharmacies = await Pharmacy.find();
    res.json(pharmacies);
    } catch (err) {
    res.status(500).send(err);
    }
});

// Додавання нової аптеки
router.post('/', async (req, res) => {
    const pharmacy = new Pharmacy(req.body);
    try {
    const savedPharmacy = await pharmacy.save();
    res.status(201).json(savedPharmacy);
    } catch (err) {
    res.status(400).send(err);
    }
});

// Додавання товару до конкретної аптеки
router.post('/:pharmacyId/products', async (req, res) => {
    try {
        const pharmacy = await Pharmacy.findById(req.params.pharmacyId);
        if (!pharmacy) {
        return res.status(404).send('Pharmacy not found');
        }

        const product = new Product(req.body); // Створення нового товару
        // Валідація товару може бути виконана тут за допомогою product.validateSync()
        pharmacy.products.push(product); // Додаємо товар до аптеки
        await pharmacy.save();
        res.status(201).json(pharmacy);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Отримання всіх товарів конкретної аптеки
router.get('/:pharmacyId/products', async (req, res) => {
    try {
      const pharmacy = await Pharmacy.findById(req.params.pharmacyId).populate('products');
      if (!pharmacy) {
        return res.status(404).send('Pharmacy not found');
      }
  
      res.json(pharmacy.products);
    } catch (err) {
      res.status(500).send(err);
    }
});


router.post('/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
