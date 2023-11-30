import jwt from 'jsonwebtoken';
import User from '../mongoDB/models/usersModels.js';

export const registerUser = async (req, res) => {
  try {
    const { username, password, email, avatarURL } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }

    const newUser = new User({
      username,
      password,
      email,
      avatarURL,
    });

    const savedUser = await newUser.save();

    const userResponse = {
      username: savedUser.username,
      email: savedUser.email,
      avatarURL: savedUser.avatarURL,
      message: 'Usuario registrado exitosamente',
    };

    res.status(201).json(userResponse);
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
};



export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
    }

    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });

    res.status(200).json({ message: 'Inicio de sesión exitoso', user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getUserInfo = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
