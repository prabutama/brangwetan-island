module.exports = (sequelize, DataTypes) => {
    const Collaborator = sequelize.define("Collaborator", {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING(255), 
            allowNull: true,
        },
        website_link: {
            type: DataTypes.STRING(255), 
            allowNull: true,
        },
    }, {
        tableName: "collaborators",
        timestamps: true,
    });

    return Collaborator;
};
