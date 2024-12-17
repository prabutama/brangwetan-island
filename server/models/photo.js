module.exports = (sequelize, DataTypes) => {
    const Photo = sequelize.define("Photo", {
        photo_url: {
            type: DataTypes.STRING(255), 
            allowNull: false, 
        },
    }, {
        tableName: "photos",
        timestamps: true,
    });

    return Photo;
};
