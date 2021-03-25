module.exports = (sequelize, DataTypes) => {
  const mobileGraffiti = sequelize.define("mobileGraffiti", {
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
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
  });
  return mobileGraffiti;
};
