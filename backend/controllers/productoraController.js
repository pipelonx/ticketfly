// controllers/productoraController.js
const Productora = require('../models/Productora');

// Crear una productora
exports.createProductora = async (req, res) => {
  try {
    const productora = new Productora(req.body);
    await productora.save();
    res.status(201).json(productora);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todas las productoras
exports.getProductoras = async (req, res) => {
  try {
    const productoras = await Productora.find();
    res.status(200).json(productoras);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Obtener una productora por ID
exports.getProductoraById = async (req, res) => {
  try {
    const productora = await Productora.findById(req.params.id);
    if (!productora) return res.status(404).json({ message: 'Productora no encontrada' });
    res.status(200).json(productora);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Actualizar una productora
exports.updateProductora = async (req, res) => {
  try {
    const productora = await Productora.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!productora) return res.status(404).json({ message: 'Productora no encontrada' });
    res.status(200).json(productora);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una productora
exports.deleteProductora = async (req, res) => {
  try {
    const productora = await Productora.findByIdAndDelete(req.params.id);
    if (!productora) return res.status(404).json({ message: 'Productora no encontrada' });
    res.status(200).json({ message: 'Productora eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
