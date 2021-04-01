const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserInputError, addErrorLoggingToSchema } = require('apollo-server')

const { validateRegisterInput, validateLoginInput } = require('../../utils/validation')
const { SECRET_KEY } = require("../../config")
const User = require("../../models/User")

module.exports = {
    Mutation: {
        async login(_, { usename, password }) {
            const { errors, valid } = validateLoginInput(usename, password)
            const user = await User.findOne({ username })

            if(!user) {
                errors.general = 'User not found!'
                throw new UserInputError('User not found!', { errors })
            }

            const match = await bcrypt.compare(password, user.password)
            if(!match) {
                errors.general = 'Wrong credentials'
                throw new UserInputError('wrong credentials', { errors })
            }
        },
        async register(
            _,
            {
              registerInput: { username, email, password, confirmPassword }
            }
          ) {
            // Validate user data
            const { valid, errors } = validateRegisterInput(
              username,
              email,
              password,
              confirmPassword
            );
            if (!valid) {
              throw new UserInputError('Errors', { errors });
            }

            // check for multiple users
            const user = await User.findOne({ username })
            if(user) {
                throw new UserInputError("Username is taken", {
                    errors: {
                        username: 'This username is taken'
                    }
                })
            }

            password = await bcrypt.hash(password, 12)

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            })

            const res = await newUser.save()

            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username
            }, SECRET_KEY, { expiresIn: '1h'})

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}