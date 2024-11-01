import { DataTypes, Model, literal } from 'sequelize';
import sequelize from '../config/db';

class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public createdOn!: Date;
    public updatedOn!: Date;
}

User.init(
    {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true,
        },
        createdOn: {
            type: DataTypes.DATE,
        },
        updatedOn: {
            type: DataTypes.DATE,
        },
    },
    {
        sequelize,
        modelName: 'User',
        timestamps: true,
        paranoid: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    }
);

export default User;
