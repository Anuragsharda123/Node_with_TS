import { DataTypes, Model} from 'sequelize';
import sequelize from '../config/db';

// Define a type for the User attributes
interface UserAttributes {
    id?: number;
    email: string;
    password: string;
}



// Define the User model class extending Sequelize's Model class
class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number;
    public email!: string;
    public password!: string;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the User model
User.init(
    {
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize, // Passing the connection instance
        modelName: 'User', // Name of the model
    }
);

export default User;
