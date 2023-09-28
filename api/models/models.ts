import { Model, DataTypes, Sequelize } from 'sequelize';

export class Flat extends Model {
    static config(sequelize: Sequelize) {
        return {
            sequelize,
            tableName: 'flats',
            modelName: 'Flat',
        };
    }
}

export type FlatAttributes = {
    title: string,
    location: string,
    price: string,
    tags: string[],
    imageUrls: string[],
};

const FlatSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    title: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'title',
    },
    location: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'location',
    },
    price: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'price',
    },
    tags: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.STRING),
        field: 'tags',
    },
    imageUrls: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.STRING),
        field: 'imageUrls',
    },
};

const setupModels = (sequelize: Sequelize) => {
    Flat.init(FlatSchema, Flat.config(sequelize));
};

export default setupModels;