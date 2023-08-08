import { validationResult } from 'express-validator';
import { pool } from "../db.js";

export const getPosts = async (req, res) => {
    try {
        const query = `
            SELECT posts.*, users.user_name, users.profile_picture,users.birthday, users.gender, users.id_rol
            FROM posts
            INNER JOIN users ON posts.id_user = users.id_user
        `;
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Algo salió mal.'
        });
    }
}

export const getPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const query = `
        select posts.*, users.profile_picture FROM posts
        INNER JOIN users ON posts.id_user = users.id_user
        where users.id_user = ?;
        `;
        const [rows] = await pool.query(query, [postId]);

        if (rows.length <= 0) {
            return res.status(404).json({
                message: 'Posteo no encontrado.'
            });
        }

        res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Algo salió mal.'
        });
    }
}


export const createPost = async (req, res) => {
    const { id_user, content } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const [rows] = await pool.query('SELECT id_posts FROM posts WHERE content = ?', [content]);
        if (rows.length > 0) {
            return res.status(409).json({
                message: 'No insertes el mismo contenido!'
            })
        }
        const result = await pool.query('INSERT INTO posts (id_user, content) VALUES (?,?)', [id_user, content]);
        const createdId = result.insertId;

        return res.status(201).json({
            id_posts: createdId,
            id_user,
            content,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Algo salió mal al crear el posteo.'
        })
    }
}

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const [result] = await pool.query('DELETE FROM posts WHERE id_posts = ?', [postId]);

        if (result.affectedRows <= 0) {
            return res.status(404).json({
                message: 'Posteo no encontrado.'
            })
        }

        res.sendStatus(204)
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Algo salió mal.'
        })
    }
}

export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const { content } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const [checkRows] = await pool.query('SELECT id_posts FROM posts WHERE id_posts = ?', [postId]);
        if (checkRows.length === 0) {
            return res.status(404).json({
                message: 'Posteo no encontrado.'
            });
        }

        const [rows] = await pool.query('UPDATE posts SET content = ? WHERE id_posts = ?', [content, postId]);

        if (rows.affectedRows === 0) {
            return res.status(404).json({
                message: 'Posteo no encontrado.'
            });
        }

        res.status(200).json({
            message: 'Posteo actualizado exitosamente.'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Algo salió mal al actualizar el posteo.'
        });
    }
}
