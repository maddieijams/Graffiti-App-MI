module.exports = (sequelize, DataTypes) => {
  const image = sequelize.define("image", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return image;
};
