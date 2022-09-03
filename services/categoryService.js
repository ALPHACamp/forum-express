const db = require('../models')
const Category = db.Category

const categoryService = {
  getCategories: async () => {
    return await Category.findAll({ attributes: ['id', 'name']})
  },

  createCategory: async (category) => {
    return await Category.create({
      name: category.name
    })
  },

  updateCategory: async (category) => {
    const target = await Category.findByPk(category.id)

    if (!target)
      return {}
    
    target.name = category.name

    await target.save()

    return target.get()
  },

  deleteCategory: async (id) => {
    await Category.destroy({ where: { id }})
  }
}
module.exports = categoryService
