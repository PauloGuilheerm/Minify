import User from './User';
import Url from './Url';

export function setupAssociations() {
    User.hasMany(Url, { foreignKey: 'userId', as: 'urls' });
    Url.belongsTo(User, { foreignKey: 'userId', as: 'user' });
}
