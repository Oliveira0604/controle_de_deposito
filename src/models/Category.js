import { DataTypes } from "sequelize";
import Product from './Product.js';
import conn from '../db/conn.js';

const Category = conn.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

Product.belongsTo(Category);
Category.hasMany(Product);

export default Category;