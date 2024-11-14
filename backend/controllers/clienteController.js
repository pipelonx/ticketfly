const Cliente = require('../models/Cliente');

// Crea un cliente

exports.createCliente = async (req, res) => {
  try {
    const { Rut_cliente, nombre_cliente, apellido_cliente, contrasena_cliente, email, cliente_vip } = req.body;


    
    // Verifica si el email o RUT ya existe en la base de datos
    const existingCliente = await Cliente.findOne({ $or: [{ email }, { Rut_cliente }] });
    if (existingCliente) {
      return res.status(400).json({ message: 'El email o RUT ya está registrado.' });
    }
    // Crear el nuevo cliente
    const cliente = new Cliente({
      Rut_cliente,
      nombre_cliente,
      apellido_cliente,
      contrasena_cliente,
      email,
      cliente_vip,
    });

    await cliente.save();
    res.status(201).json({ message: 'Cliente registrado con éxito', cliente });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar cliente' });
  }
};


// Obtener todos los clientes
exports.getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un cliente por ID
exports.getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un cliente
exports.updateCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.status(200).json(cliente);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un cliente
exports.deleteCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.status(200).json({ message: 'Cliente eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
