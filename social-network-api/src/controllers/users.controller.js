import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { pool } from "../db.js";

export const registerUser = async (req, res) => {
    const { user_name, email, password, id_rol, profile_picture, birthday, gender } = req.body;
    let id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'El email ya está registrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO users (user_name, email, password, id_rol, profile_picture, birthday, gender) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [user_name, email, hashedPassword, id_rol, profile_picture, birthday, gender];

        const [result] = await pool.query(query, values);

        id = result.insertId;
        
        res.status(201).json({
            message: 'Usuario registrado correctamente',
            user: { id, user_name, email, id_rol, profile_picture, birthday, gender }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Algo salió mal al registrar el usuario' });
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'El usuario no existe' });
        }

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
   
        res.send({
            id: user.id_user,
            user_name: user.user_name,
            email: user.email,
            id_rol: user.id_rol,
            profile_picture: user.profile_picture,
            birthday: user.birthday,
            gender: user.gender
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Algo salió mal al iniciar sesión' });
    }
};
export const getUsers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users')
        res.json(rows)
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Algo salió mal.'
        })
    }
}

export const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const [rows] = await pool.query('SELECT * FROM users WHERE id_user = ?', [userId])

        if (rows.length <= 0) {
            return res.status(404).json({
                message: 'Usuario no encontrado.'
            })
        }

        res.json(rows[0])
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Algo salió mal.'
        })
    }
}

export const updateProfilePic = async (req, res) => {
    const { id } = req.params;
    const { profile_picture } = req.body;

    try {
        const [result] = await pool.query('UPDATE users SET profile_picture = ? WHERE id_user = ?', [profile_picture, id])

        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Usuario no encontrado'
        })

        const [rows] = await pool.query('SELECT * FROM users WHERE id_user = ?', [id])

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
        })
    }
}
