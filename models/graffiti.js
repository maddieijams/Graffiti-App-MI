module.exports = (sequelize, DataTypes) => {
  const Graffiti = sequelize.define("graffiti", {
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    info: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lat: {
      type: DataTypes.DECIMAL, //??
      allowNull: false,
    },
    lng: {
      type: DataTypes.DECIMAL, //??
      allowNull: false,
    },
    owner: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Graffiti;
};
