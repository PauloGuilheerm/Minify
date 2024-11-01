import sequelize from './config/db';

const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true, force: true });
    } catch (error) {
        console.error('Error synchronizing the database:', error);
    } finally {
        await sequelize.close();
    }
};

syncDatabase();
