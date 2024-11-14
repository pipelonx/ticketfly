
const Asiento = require('../models/Asiento');


// Crear un asiento
exports.createAsiento = async (req, res) => {
  try {
    const asiento = new Asiento(req.body);
    await asiento.save();
    res.status(201).json(asiento);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Obtener todos los asientos
exports.getAsientos = async (req, res) => {
  try {
    const asientos = await Asiento.find();
    res.status(200).json(asientos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Obtener un asiento por ID
exports.getAsientoById = async (req, res) => {
  try {
    const asiento = await Asiento.findById(req.params.id);
    if (!asiento) return res.status(404).json({ message: 'Asiento no encontrado' });
    res.status(200).json(asiento);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un asiento
exports.updateAsiento = async (req, res) => {
  try {
    const asiento = await Asiento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!asiento) return res.status(404).json({ message: 'Asiento no encontrado' });
    res.status(200).json(asiento);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un asiento
exports.deleteAsiento = async (req, res) => {
  try {
    const asiento = await Asiento.findByIdAndDelete(req.params.id);
    if (!asiento) return res.status(404).json({ message: 'Asiento no encontrado' });
    res.status(200).json({ message: 'Asiento eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
