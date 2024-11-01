import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Url extends Model {
    public id!: number;
    public access!: number;
    public originalUrl!: string;
    public shortUrl!: string;
    public userId!: number | null;
    public deletedAt!: Date | null;
}

Url.init(
    {
      originalUrl: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      shortUrl: {
          type: DataTypes.STRING(6),
          unique: true,
          allowNull: false,
      },
      userId: {
          type: DataTypes.INTEGER,
          allowNull: true,
      },
      access: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
      },
      deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Url',
      timestamps: true,
      paranoid: true,
    }
);

export default Url;
