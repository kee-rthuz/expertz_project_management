import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const users = []; // This is a temporary store, ideally use a database.

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });

    const token = jwt.sign({ username }, 'secret', { expiresIn: '1h' });
    
    res.status(201).json({ token });
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
