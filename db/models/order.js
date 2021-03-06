const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, OrderProducts }) {
      this.belongsTo(User, {
        foreignKey: 'user_id',
      });
      this.hasMany(OrderProducts, {
        foreignKey: 'order_id',
      });
    }
  }
  Order.init({
    number: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
