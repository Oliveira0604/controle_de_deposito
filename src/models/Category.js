import { DataTypes } from "sequelize";
import Product from './Products.js';
import conn from '../db/conn.js';

const Category = conn.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Product.belongsTo(Category);
Category.hasMany(Product);

export default Category;