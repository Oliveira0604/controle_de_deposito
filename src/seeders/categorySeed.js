import Category from '../models/Category.js';

export const seedCategories = async () => {
    const categories = [
        {name: 'Eletronico'},
        {name: 'Limpeza'},
        {name: 'Escritório'}
    ]

    // verifica se a categoria existe ou não.
    for (const category of categories) {
        await Category.findOrCreate({where: {name: category.name}})
    }
}