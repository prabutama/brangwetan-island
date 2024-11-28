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
            type: DataTypes.ENUM("text", "image", "video"),
            allowNull: false,
            defaultValue: "text", // Default bisa teks, bisa diubah sesuai input admin
        },
        content: {
            type: DataTypes.STRING(255), // Menyimpan path gambar atau URL video
            allowNull: false, // Isi konten, bisa berupa URL atau path file
        },
    }, {
        tableName: "modules",
        timestamps: true,
    });

    return Module;
};
