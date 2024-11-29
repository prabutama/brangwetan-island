module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      post_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(255), // Menyimpan path gambar jika ada
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Referensi ke model User
          key: 'user_id',
        },
      },
    },
    {
      tableName: "posts",
      timestamps: true,  // Akan mencatat kapan postingan dibuat
    }
  );

  // Menambahkan asosiasi dengan model User
  Post.associate = function (models) {
    // Setiap Post dimiliki oleh satu User
    Post.belongsTo(models.User, {
      foreignKey: "user_id",  // Kunci asing untuk menghubungkan dengan User
      as: "author",  // Nama alias untuk asosiasi
    });
  };

  return Post;
};
