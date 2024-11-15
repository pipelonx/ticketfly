const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Cliente = require('../models/Cliente');

const jwtSecret = process.env.JWT_SECRET || 'tu_secreto_jwt';

// registro de un cliente
exports.register = async (req, res) => {
  try {
    const { Rut_cliente, nombre_cliente, apellido_cliente, email, contrasena_cliente, cliente_vip } = req.body;

    // verificar si el cliente ya existe
    const existingCliente = await Cliente.findOne({ email });
    if (existingCliente) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }
    // cifrar la contraseña
    const hashedPassword = await bcrypt.hash(contrasena_cliente, 10);
    // crear y guardar el cliente
    const cliente = new Cliente({
      Rut_cliente,
      nombre_cliente,
      apellido_cliente,
      contrasena_cliente: hashedPassword,
      email,
      cliente_vip,
    });

    await cliente.save();
    res.status(201).json({ message: 'Cliente registrado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar cliente' });
  }
};

// login de cliente
exports.login = async (req, res) => {
  try {
    const { email, contrasena_cliente } = req.body;

    // buscar cliente por email
    const cliente = await Cliente.findOne({ email });
    if (!cliente) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // verificar la contraseña
    const isMatch = await bcrypt.compare(contrasena_cliente, cliente.contrasena_cliente);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // crear el JWT
    const token = jwt.sign({ id: cliente._id, email: cliente.email }, jwtSecret, { expiresIn: '1h' });

    res.status(200).json({ token, message: 'Inicio de sesión exitoso' });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

// obtener todos los clientes
exports.getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los clientes' });
  }
};

// pbtener un cliente por ID
exports.getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el cliente' });
  }
};

// actualizar un cliente
exports.updateCliente = async (req, res) => {
  try {
    const { Rut_cliente, nombre_cliente, apellido_cliente, email, cliente_vip } = req.body;
    const cliente = await Cliente.findByIdAndUpdate(
      req.params.id,
      { Rut_cliente, nombre_cliente, apellido_cliente, email, cliente_vip },
      { new: true }
    );

    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el cliente' });
  }
};

// eliminar un cliente
exports.deleteCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.status(200).json({ message: 'Cliente eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el cliente' });
  }
};


exports.getVipClientes = async (req, res) => {
  try {
    const vipClientes = await Cliente.find({ cliente_vip: true });
    res.status(200).json(vipClientes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los clientes VIP' });
  }
};
