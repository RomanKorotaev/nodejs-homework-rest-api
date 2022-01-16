import Joi from 'joi';
import pkg from 'mongoose';
import { MAX_AGE, MIN_AGE } from '../../../lib/constants'

const {Types} =pkg;

const createSchema = Joi.object ({
    name: Joi.string().min(2).max(30).required(),
    email:Joi.string().email().required(),
    phone:Joi.string().required(),
    age: Joi.number().integer().min(MIN_AGE).max(MAX_AGE).optional(),
    favorite: Joi.bool().optional(),
});


const updateSchema = Joi.object ({
    name: Joi.string().optional(),
    email:Joi.string().email().optional(),
    phone:Joi.string().optional(),
    age: Joi.number().integer().min(MIN_AGE).max(MAX_AGE).optional(),
    favorite: Joi.bool().optional(),
}).or ('name', 'email', 'phone', 'age');


const updateStatusContactSchema = Joi.object ({
    favorite: Joi.bool().required(),
});


const regLimit = /\d+/

const querySchema = Joi.object ({
    limit: Joi.string().pattern(regLimit).optional(),
    skip: Joi.number().min(0).optional(),
    sortBy: Joi.string().valid('name', 'email').optional(),
    sortByDesc: Joi.string().valid('name', 'email').optional(),
    filter: Joi.string().pattern(new RegExp( '(name|email)\\|?(name|email)+' )).optional(),
});

const idSchema = Joi.object({id: Joi.string().required() })


export const validateCreate = async (req, res, next)=> {
    try{
        const value = await createSchema.validateAsync(req.body)
    } catch (err){
        return res.status(400).json({message: `Field ${err.message.replace(/"/g, '')}` })
    }
    next();
}

export const validateUpdate = async (req, res, next)=> {
    try{
        const value = await updateSchema.validateAsync(req.body)
    } catch (err){
        console.log(err.details)
        const [{type}] = err.details;
        // if (type==='object.unknown') {
            if (type==='object.missing') {
            return res.status(400).json({message: 'missing field'})
        }
        return res.status(400).json({message: err.message })
    }
    next();
}

export const updateStatusContact = async (req, res, next)=> {
    try{
        const value = await updateStatusContactSchema.validateAsync(req.body)
    } catch (err){
        console.log(err.details)
        const [{type}] = err.details;
        // if (type==='object.unknown') {
            if (type==='object.missing') {
            return res.status(400).json({message: 'missing fields favorite'})
        }
        return res.status(400).json({message: err.message })
    }
    next();
}

// // Option #1
// export const validateId = async (req, res, next)=> {
//     try{
//         const value = await idSchema.validateAsync(req.params)
//     } catch (err){
//         return res.status(400).json({message: ` ${err.message.replace(/"/g, '')}` })
//     }
//     next();
// }


export const validateId = async (req, res, next)=> {
    if (!Types.ObjectId.isValid(req.params.id) ) {
        return res.status(400).json({message: 'Invalid ObjectId' })
    }
    next();
}

// querySchema
export const validateQuery = async (req, res, next)=> {
    try{
        const value = await querySchema.validateAsync(req.query)
    } catch (err){
        return res.status(400).json({message: ` ${err.message.replace(/"/g, '')}` })
    }
    next();
}


// import Joi from 'joi'

// const createSchema = Joi.object ({
//     name: Joi.string().min(2).max(30).required(),
//     email:Joi.string().email().required(),
//     phone:Joi.string().required(),
// });


// const updateSchema = Joi.object ({
//     name: Joi.string().optional(),
//     email:Joi.string().email().optional(),
//     phone:Joi.string().optional(),
// }).or ('name', 'email', 'phone');

// const idSchema = Joi.object({id: Joi.string().required() })

// export const validateCreate = async (req, res, next)=> {
//     try{
//         const value = await createSchema.validateAsync(req.body)
//     } catch (err){
//         return res.status(400).json({message: `Field ${err.message.replace(/"/g, '')}` })
//     }
//     next();
// }

// export const validateUpdate = async (req, res, next)=> {
//     try{
//         const value = await updateSchema.validateAsync(req.body)
//     } catch (err){
//         console.log(err.details)
//         const [{type}] = err.details;
//         if (type==='object.unknown') {
//             return res.status(400).json({message: err.message})
//         }
//         return res.status(400).json({message: `missing fields` })
//     }
//     next();
// }

// export const validateId = async (req, res, next)=> {
//     try{
//         const value = await idSchema.validateAsync(req.params)
//     } catch (err){
//         return res.status(400).json({message: ` ${err.message.replace(/"/g, '')}` })
//     }
//     next();
// }


