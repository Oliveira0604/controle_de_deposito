import { DataTypes } from 'sequelize';
import User from './User.js';
import Product from './Product.js';
import conn from '../db/conn.js';

const Movement = conn.define('Movement', {
    type: {
        type: DataTypes.ENUM('in', 'out'),
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
})

Movement.belongsTo(Product)
Movement.belongsTo(User)
User.hasMany(Movement)

export default Movement;