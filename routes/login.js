const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Aquí iría tu lógica de autenticación, por ejemplo:
  if (username === 'usuario' && password === 'password') {
    // Si las credenciales son correctas, generas un token JWT
    const token = jwt.sign({ username }, 'secret-key', { expiresIn: '1h' });

    // Guardas el token en una cookie
    res.cookie('jwt', token, { httpOnly: true, secure: true });

    // Envías una respuesta de éxito
    res.status(200).json({ message: 'Login successful' });
  } else {
    // Si las credenciales no son válidas
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
