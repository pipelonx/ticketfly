const Evento = require('../models/Evento');

// Crear un evento
exports.createEvento = async (req, res) => {
  try {
    const evento = new Evento(req.body);
    await evento.save();
    res.status(201).json(evento);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los eventos
exports.getEventos = async (req, res) => {
  try {
    const eventos = await Evento.find();
    res.status(200).json(eventos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un evento por ID
exports.getEventoById = async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id);
    if (!evento) return res.status(404).json({ message: 'Evento no encontrado' });
    res.status(200).json(evento);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un evento
exports.updateEvento = async (req, res) => {
  try {
    const evento = await Evento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!evento) return res.status(404).json({ message: 'Evento no encontrado' });
    res.status(200).json(evento);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un evento
exports.deleteEvento = async (req, res) => {
  try {
    const evento = await Evento.findByIdAndDelete(req.params.id);
    if (!evento) return res.status(404).json({ message: 'Evento no encontrado' });
    res.status(200).json({ message: 'Evento eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
