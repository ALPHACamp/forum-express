const { SuccessResponse, ErrorResponse } = require('../../data/response')

const { uploadImage } = require('../../helpers/imageHelper')

const categoryService = require('../../services/categoryService')
const restService = require('../../services/restService')
const userService = require('../../services/userService')

const adminController = {
  getRestaurants: async (req, res, next) => {
    /*  #swagger.tags = ['Admin']
        #swagger.summary = '取得所有餐廳' */

    /*  #swagger.security = [{
          bearerAuth: []
    }]  */
    try {
      const restaurants = await restService.getRestaurants()

      return res.json(new SuccessResponse({ restaurants }))
    } catch (err) {
      next(err)
    }
  },

  getRestaurant: async (req, res, next) => {
    /*  #swagger.tags = ['Admin']
        #swagger.summary = '取得餐廳' */

    /*  #swagger.parameters['id'] = {
          in: 'path',
          schema: {
            type: 'integer'
          },
          description: '餐廳ID',
          required: true
    } */

    /*  #swagger.security = [{
          bearerAuth: []
    }]  */
    try {
      const restaurant = await restService.getRestaurant(req.params.id)

      return res.json(new SuccessResponse({ restaurant }))
    } catch (err) {
      next(err)
    }
  },
  
  postRestaurant: async (req, res, next) => {
    /*  #swagger.tags = ['Admin']
        #swagger.summary = '新增餐廳' */

    /*  #swagger.requestBody = {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    example: 'Yum Yum restaurant',
                    description: '名稱'
                  },
                  categoryId: {
                    type: 'integer',
                    description: '類別ID'
                  },
                  tel: {
                    type: 'string',
                    example: '01-0000-0000',
                    description: '電話'
                  },
                  address: {
                    type: 'string',
                    example: '930 Address Dist.',
                    description: '地址'
                  },
                  opening_hours: {
                    type: 'string',
                    example: '08:00 - 09:00',
                    description: '營業時間'
                  },
                  description: {
                    type: 'string',
                    example: 'restaurant description',
                    description: '敘述'
                  },
                  image: {
                    type: 'string',
                    format: 'binary',
                    description: '圖片'
                  }
                },
                required: ['name', 'categoryId']
              }
            }
          }
    } */

    /*  #swagger.security = [{
          bearerAuth: []
    }]  */
    try {
      if (!req.body.name)
        return res.json(new ErrorResponse('field [name] is required'))
      if (!req.body.categoryId)
        return res.json(new ErrorResponse('field [categoryId] is required'))

      const restaurant = { ...req.body }
      const { file } = req

      if (file)
        restaurant.image = await uploadImage(file)
      else
        restaurant.image = null

      const created = await restService.createRestaurant(restaurant)

      return res.json(new SuccessResponse({ restaurant: created.get() }, 'restaurant was successfully created'))
    } catch (err) {
      next(err)
    }
  },

  putRestaurant: async (req, res, next) => {
    /*  #swagger.tags = ['Admin']
        #swagger.summary = '更新餐廳' */

    /*  #swagger.parameters['id'] = {
          in: 'path',
          schema: {
            type: 'integer'
          },
          description: '餐廳ID',
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
                    example: 'Yum Yum restaurant',
                    description: '名稱'
                  },
                  categoryId: {
                    type: 'integer',
                    description: '類別ID'
                  },
                  tel: {
                    type: 'string',
                    example: '01-0000-0000',
                    description: '電話'
                  },
                  address: {
                    type: 'string',
                    example: '930 Address Dist.',
                    description: '地址'
                  },
                  opening_hours: {
                    type: 'string',
                    example: '08:00 - 09:00',
                    description: '營業時間'
                  },
                  description: {
                    type: 'string',
                    example: 'restaurant description',
                    description: '敘述'
                  },
                  image: {
                    type: 'string',
                    format: 'binary',
                    description: '圖片'
                  }
                },
                required: ['name', 'categoryId']
              }
            }
          }
    } */

    /*  #swagger.security = [{
          bearerAuth: []
    }]  */
    try {
      if (!req.body.name)
        return res.json(new ErrorResponse('field [name] is required'))
      if (!req.body.categoryId)
        return res.json(new ErrorResponse('field [categoryId] is required'))

      const restaurant = { id: req.params.id, ...req.body }
      const { file } = req

      if (file)
        restaurant.image = await uploadImage(file)
      else
        restaurant.image = null

      const updated = await restService.updateRestaurant(restaurant)

      return res.json(new SuccessResponse({ restaurant: updated }, 'restaurant was successfully updated'))
    } catch (err) {
      next(err)
    }
  },

  deleteRestaurant: async (req, res, next) => {
    /*  #swagger.tags = ['Admin']
        #swagger.summary = '刪除餐廳' */

    /*  #swagger.parameters['id'] = {
          in: 'path',
          schema: {
            type: 'integer'
          },
          description: '餐廳ID',
          required: true
    } */

    /*  #swagger.security = [{
          bearerAuth: []
    }]  */
    try {
      await restService.deleteRestaurant(req.params.id)

      return res.json(new SuccessResponse())
    } catch (err) {
      next(err)
    }
  },

  getUsers: async (req, res, next) => {
    /*  #swagger.tags = ['Admin']
        #swagger.summary = '取得所有使用者' */

    /*  #swagger.security = [{
          bearerAuth: []
    }]  */
    try {
      const users = await userService.getUsers()

      return res.json(new SuccessResponse({ users }))
    } catch (err) {
      next(err)
    }
  },
  
  putUser: async (req, res, next) => {
    /*  #swagger.tags = ['Admin']
        #swagger.summary = '更新使用者角色' */

    /*  #swagger.parameters['id'] = {
          in: 'path',
          schema: {
            type: 'integer'
          },
          description: '使用者ID',
          required: true
    } */

    /*  #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: 'object',
                properties: {
                  isAdmin: {
                    type: 'string',
                    example: 'true',
                    description: '是否為管理者'
                  }
                },
                required: ['isAdmin']
              }
            }
          }
    } */

    /*  #swagger.security = [{
          bearerAuth: []
    }]  */
    try {
      const user = { id: req.params.id, isAdmin: req.body.isAdmin === 'true' }

      await userService.updateUserRole(user)

      return res.json(new SuccessResponse(null, 'user was successfully updated'))
    } catch (err) {
      next(err)
    }
  },

  getCategories: async (req, res, next) => {
    /*  #swagger.tags = ['Admin']
        #swagger.summary = '取得所有類別' */

    /*  #swagger.security = [{
          bearerAuth: []
    }]  */
    try {
      const categories = await categoryService.getCategories()

      return res.json(new SuccessResponse({ categories }))
    } catch (err) {
      next(err)
    }
  },

  postCategory: async (req, res, next) => {
    /*  #swagger.tags = ['Admin']
        #swagger.summary = '新增類別' */

    /*  #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    example: 'Grocery',
                    description: '名稱'
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
      if (!req.body.name)
        return req.json(new ErrorResponse('field [name] is required'))

      const category = { ...req.body }

      const result = await categoryService.createCategory(category)

      return res.json(new SuccessResponse({ categoryId: result.id }, 'category was successfully created'))
    } catch (err) {
      next(err)
    }
  },

  putCategory: async (req, res, next) => {
    /*  #swagger.tags = ['Admin']
        #swagger.summary = '更新類別' */

    /*  #swagger.parameters['id'] = {
          in: 'path',
          schema: {
            type: 'integer'
          },
          description: '類別ID',
          required: true
    } */

    /*  #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    example: 'Grocery',
                    description: '名稱'
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
      if (!req.body.name)
        return req.json(new ErrorResponse('field [name] is required'))

      const category = { id: req.params.id, ...req.body }

      const result = await categoryService.updateCategory(category)

      return res.json(new SuccessResponse({ categoryId: result.id }, 'category was successfully updated'))
    } catch (err) {
      next(err)
    }
  },

  deleteCategory: async (req, res, next) => {
    /*  #swagger.tags = ['Admin']
        #swagger.summary = '刪除類別' */

    /*  #swagger.parameters['id'] = {
          in: 'path',
          schema: {
            type: 'integer'
          },
          description: '類別ID',
          required: true
    } */

    /*  #swagger.security = [{
          bearerAuth: []
    }]  */
    try {
      await categoryService.deleteCategory(req.params.id)

      return res.json(new SuccessResponse())
    } catch (err) {
      next(err)
    }
  }
}
module.exports = adminController
