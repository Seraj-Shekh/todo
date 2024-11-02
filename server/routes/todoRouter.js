import {pool} from '../helper/db.js';
import { Router } from 'express';
import { emptyOrRows } from '../helper/utils.js';

const router = Router();

router.get('/', (req, res, next) => {
   
    pool.query('SELECT * FROM task', (error, result) => {
        if (error) {
            return next(error)
        }
        return res.status(200).json(emptyOrRows(result))
    })
}); 

router.post('/create', (req, res, next) => {
   
    pool.query('INSERT INTO task (description) VALUES ($1) returning *', 
    [req.body.description], (error, result) => {
        if (error) {
            return next(error)
        }
        return res.status(200).json({id: result.rows[0].id})
    })
});

router.delete('/delete/:id', (req, res, next) => {
    
    pool.query('DELETE FROM task WHERE id = $1', [req.params.id], (error, result) => {
        if (error) {
            return next(error)
        }
        return res.status(200).json({message: 'Task deleted successfully'})
    })
});

export default router;