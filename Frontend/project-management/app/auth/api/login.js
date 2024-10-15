import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const users = []; // This is a temporary store, ideally use a database.

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ email }, 'secret', { expiresIn: '1h' });

    res.status(200).json({ token, email });
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}