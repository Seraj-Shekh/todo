import { pool } from '../helper/db.js';
import e, { Router } from 'express';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
const { sign } = jwt;

const router = Router();

router.post('/register', (req, res, next) => {
    hash(req.body.password, 10, (error, hashedpassword) => {
        if (error) next(error)
        try {
            pool.query('INSERT INTO account (email,password) VALUES ($1, $2) RETURNING *', [req.body.email, hashedpassword], (error, results) => {
                if (error) next(error)
                res.status(201).json({ id: results.rows[0].id, email: results.rows[0].email })

            }
            )
        } catch (error) {
            return next(error)
        }
    })
})


export default router;