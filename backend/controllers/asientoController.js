
const Asiento = require('../models/Asiento');

// crear un asiento
exports.createAsiento = async (req, res) => {
  try {
    const asiento = new Asiento(req.body);
    await asiento.save();
    res.status(201).json(asiento);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// obtener todos los asientos
exports.getAsientos = async (req, res) => {
  try {
    const asientos = await Asiento.find();
    res.status(200).json(asientos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// pbtener un asiento segun id
exports.getAsientoById = async (req, res) => {
  try {
    const asiento = await Asiento.findById(req.params.id);
    if (!asiento) return res.status(404).json({ message: 'Asiento no encontrado' });
    res.status(200).json(asiento);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// actualizar un asiento
exports.updateAsiento = async (req, res) => {
  try {
    const asiento = await Asiento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!asiento) return res.status(404).json({ message: 'Asiento no encontrado' });
    res.status(200).json(asiento);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// eliminar un asiento
exports.deleteAsiento = async (req, res) => {
  try {
    const asiento = await Asiento.findByIdAndDelete(req.params.id);
    if (!asiento) return res.status(404).json({ message: 'Asiento no encontrado' });
    res.status(200).json({ message: 'Asiento eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Evento = require('../models/Evento');


//mostrar asiento segun disponivlidad por eventos
exports.getAsientosGroupedByDisponibilidad = async (req, res) => {
  try {
    const asientos = await Asiento.aggregate([
      {
        $lookup: {
          from: 'eventos', 
          localField: 'id_evento', 
          foreignField: '_id', 
          as: 'eventoInfo' 
        }
      },
      {
        $unwind: '$eventoInfo' 
      },
      {
        $group: {
          _id: '$disponible',
          totalAsientos: { $sum: 1 },
          detalles: {
            $push: {
              id: '$_id',
              ubicacion: '$ubicacion',
              precio: '$precio',
              nombre_evento: '$eventoInfo.nombre_evento', // Incluye el nombre del evento
              fecha_evento: '$eventoInfo.fecha' // Incluye la fecha del evento
            }
          }
        }
      }
    ]);
    res.status(200).json(asientos);
  } catch (error) {
    res.status(500).json({ message: 'Error al agrupar los asientos' });
  }
};
