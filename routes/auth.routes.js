const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('../config/default.json')


const router = Router()
// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Incorrect Email').isEmail(),
        check('password', '6 symbols minimum').isLength({min: 6}),
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'incorrect data'
                })
            }


            const {email, password} = req.body
            const candidate = await User.findOne({email: email})

            if (candidate) {
                return res.status(400).json({message: "This email exist"})
            }

            const hashedPass = await bcrypt.hash(password, 12)
            const user = new User({email: email, password: hashedPass})

            await user.save()

            res.status(201).json({message: 'User Create'})

        } catch (e) {
            res.status(500).json({message: 'ERROR PISDA'})
        }
    })


router.post(
    '/login',
    [
        check('email', 'email is incorrect').normalizeEmail().isEmail(),
        check('password', 'Input pass').exists()
    ],

    async (req, res) => {

        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'incorrect data'
                })
            }


            const {email, password} = req.body
            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({
                    message:
                        'No user exist'
                })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({message: 'not correct'})
            }


            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )
            res.json({token, userId: user.id})

        } catch (e) {
            res.status(500).json({message: 'ERROR PISDA'})
        }

    }
)


module.exports = router
