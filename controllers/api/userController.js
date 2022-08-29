const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { uploadImage } = require('../../helpers/imageHelper')
const { ErrorResponse, SuccessResponse } = require('../../data/response')

const userService = require('../../services/userService')

const userController = {
  signIn: async (req, res, next) => {
    /*  #swagger.tags = ['User']
        #swagger.summary = 'Sign in a specific user'  */

    /*  #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    example: 'example@example.com'
                  },
                  password: {
                    type: 'string',
                    example: 'password'
                  }
                },
                required: ['email', 'password']
              }
            }
          }
    } */
    try {
      if (!req.body.email || !req.body.password) 
        return res.json(new ErrorResponse('required fields doesn\'t exist'))

      const user = await userService.getUserByEmail(req.body.email)

      if (!user)
        return res.status(401).json(new ErrorResponse('user not found'))

      const result = await bcrypt.compare(req.body.password, user.password)

      if (!result)
        return res.status(401).json(new ErrorResponse('incorrect password'))

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)

      return res.json(new SuccessResponse({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin
        }
      }, 'ok'))
    }
    catch (err) {
      next(err)
    }
  },

  signUp: async (req, res, next) => {
    /*  #swagger.tags = ['User']
        #swagger.summary = 'Sign up an account' */

    /*  #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    example: 'tester'
                  },
                  email: {
                    type: 'string',
                    example: 'example@example.com'
                  },
                  password: {
                    type: 'string',
                    example: 'password'
                  },
                  passwordCheck: {
                    type: 'string',
                    example: 'password'
                  }
                },
                required: ['email', 'password', 'passwordCheck']
              }
            }
          }
    } */
    try {
      if (req.body.passwordCheck !== req.body.password)
        return res.json({ status: 'error', message: 'confirm password should be same as password' })
  
      const user = await userService.getUserByEmail(req.body.email)
  
      if (user)
        return res.json({ status: 'error', message: 'email has been registered'})
      
      const salt = await bcrypt.genSalt(10)
      const hashedPwd = await bcrypt.hash(req.body.password, salt)
  
      await userService.createUser({ name: req.body.name, email: req.body.email, password: hashedPwd })
  
      return res.json({ status: 'success', message: 'signup successfully'})
    } catch (err) {
      next(err)
    }
  },

  getUser: async (req, res, next) => {
    /*  #swagger.tags = ['User']
        #swagger.summary = 'Get user by user ID' */

    /*  #swagger.parameters['id'] = {
          in: 'path',
          schema: {
            type: 'integer'
          },
          description: 'User ID',
          required: true
    } */

    /*  #swagger.security = [{
          bearerAuth: []
    }]  */
    try {
      const user = await userService.getUserProfile(req.params.id)
      const isFollowed = req.user.Followings.map(d => d.id).includes(user.id)

      return res.json(new SuccessResponse({ profile: user, isFollowed }))
    } catch (err) {
      next(err)
    }
  },

  putUser: async (req, res, next) => {
    /*  #swagger.tags = ['User']
        #swagger.summary = 'Update user'  */

    /*  #swagger.parameters['id'] = {
          in: 'path',
          schema: {
            type: 'integer'
          },
          description: 'User ID',
          required: true
    } */
    
    /*  #swagger.requestBody = {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    example: 'tester'
                  },
                  image: {
                    type: 'string',
                    format: 'binary'
                  }
                },
                required: ['name']
              }
            }
          }
    } */

    /*  #swagger.security = [{
          bearerAuth: []
    }]  */
    try {
      if (Number(req.params.id) !== Number(req.user.id))
        return res.json(new ErrorResponse('permission denied'))
      
      const { file } = req
      const user = { id: req.params.id, name: req.body.name }

      if (file)
        user.image = await uploadImage(file)
      else
        user.image = null

      await userService.updateUser(user)

      return res.json(new SuccessResponse(null, 'updated successfully'))
    } catch (err) {
      next(err)
    }
  },

  getTopUser: async (req, res, next) => {
    /*  #swagger.tags = ['User']
        #swagger.summary = 'Get users sort by follower count' */

    /*  #swagger.security = [{
          bearerAuth: []
    }]  */
    try {
      const users = await userService.getTopUsers()
      const followingIds = req.user.Followings ? req.user.Followings.map(f => f.id) : []

      users.forEach(user => {
        user.isFollowed = followingIds.includes(user.id)
      })

      return res.json(new SuccessResponse({ users }))
    } catch (err) {
      next(err)
    }
  },

  getCurrentUser: (req, res) => {
    /*  #swagger.tags = ['User']
        #swagger.summary = 'Get current login user' */

    /*  #swagger.security = [{
          bearerAuth: []
    }]  */
    try {
      return res.json(new SuccessResponse(
        {
          id: req.user.id,
          name: req.user.name,
          email: req.user.email,
          image: req.user.image,
          isAdmin: req.user.isAdmin
        }
      ))
    } catch (err) {
      next(err)
    }
  }
}

module.exports = userController
