module.exports = (sequelize, DataTypes) => {
    const Module = sequelize.define("Module", {
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM("image", "video"),
            allowNull: false,
            defaultValue: "image", 
        },
        content: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    }, {
        tableName: "modules",
        timestamps: true,
    });

    return Module;
};
