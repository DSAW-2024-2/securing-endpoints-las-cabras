const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@admin.com' && password === 'admin') {
    const token = jwt.sign({ email }, 'secret-key', { expiresIn: '1h' });
    res.cookie('jwt', token, { httpOnly: true });
    return res.json({ message: "Logged in successfully" });
  }
  res.status(401).json({ message: "Invalid credentials" });
});

app.use('/users', usersRoutes);
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});