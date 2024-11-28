module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM("user", "admin"), // Role bisa admin atau user
            allowNull: false,
            defaultValue: "user", // Defaultnya adalah user
        },
    }, {
        tableName: "users",
        timestamps: true,
    });

    User.associate = function (models) {
        User.hasMany(models.Post, {
            foreignKey: "user_id",
            as: "posts", // Menghubungkan user dengan banyak post
            onDelete: "CASCADE",
        });
    };

    return User;
};
