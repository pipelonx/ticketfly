const Venta = require('../models/Venta');

// Crear una venta
exports.createVenta = async (req, res) => {
  try {
    const venta = new Venta(req.body);
    await venta.save();
    res.status(201).json(venta);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todas las ventas
exports.getVentas = async (req, res) => {
  try {
    const ventas = await Venta.find();
    res.status(200).json(ventas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una venta por ID
exports.getVentaById = async (req, res) => {
  try {
    const venta = await Venta.findById(req.params.id);
    if (!venta) return res.status(404).json({ message: 'Venta no encontrada' });
    res.status(200).json(venta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una venta
exports.updateVenta = async (req, res) => {
  try {
    const venta = await Venta.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!venta) return res.status(404).json({ message: 'Venta no encontrada' });
    res.status(200).json(venta);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una venta
exports.deleteVenta = async (req, res) => {
  try {
    const venta = await Venta.findByIdAndDelete(req.params.id);
    if (!venta) return res.status(404).json({ message: 'Venta no encontrada' });
    res.status(200).json({ message: 'Venta eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTotalVentasByCliente = async (req, res) => {
  try {
    const ventas = await Venta.aggregate([
      {
        $lookup: {
          from: 'clientes', 
          localField: 'Rut_cliente',
          foreignField: '_id',
          as: 'cliente_info'
        }
      },
      {
        $unwind: '$cliente_info'
      },
      {
        $group: {
          _id: '$cliente_info.nombre_cliente',
          totalVentas: { $sum: '$total_ventas' },
          ventas: { $push: '$$ROOT' }
        }
      }
    ]);

    res.status(200).json(ventas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//