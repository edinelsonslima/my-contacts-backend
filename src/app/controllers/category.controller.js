const CategoryRepository = require('../repositories/category.repository');
const isValidUUID = require('../utils/isValidUUID');

class CategoryController {
  async index(request, response) {
    const categories = await CategoryRepository.findAll();
    return response.json(categories);
  }

  async show(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid category id' });
    }

    const category = await CategoryRepository.findById(id);

    if (!category) {
      return response.status(404).json({ error: 'Category not found' });
    }

    return response.json(category);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const category = await CategoryRepository.create({ name });

    return response.status(201).json(category);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid category id' });
    }

    const categoryExists = await CategoryRepository.findById(id);

    if (!categoryExists) {
      return response.status(404).json({ error: 'Category not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const category = await CategoryRepository.update(id, { name });

    return response.json(category);
  }

  async delete(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid category id' });
    }

    await CategoryRepository.delete(id);
    return response.sendStatus(204);
  }
}

module.exports = new CategoryController();
