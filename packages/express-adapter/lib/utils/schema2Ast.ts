import type { Model } from 'mongoose'
import { capitalize } from '../types';

export function schemaToAST<T>(model: Model<T>): AST {
    const { schema, modelName } = model;
    const ast = {
        type: capitalize(modelName),
        properties: {},
    };

    Object.keys(schema.obj).forEach(key => {
        ast.properties[key] = getType(schema.obj[key]);
    });

    return ast;
}

function getType(obj): AST {
    if (Array.isArray(obj)) {
        return {
            type: 'Array',
            items: obj.map(getType),
        };
    }

    if (typeof obj === 'object') {
        if (obj.type) {
            return {
                type: getTypeName(obj.type),
                default: obj.default,
                required: obj.required || false,
                unique: obj.unique || false,
                ref: obj.ref || null,
            };
        }

        const subObject = {
            type: 'Object',
            properties: {},
        };

        Object.keys(obj).forEach(key => {
            subObject.properties[key] = getType(obj[key]);
        });

        return subObject;
    }

    return {
        type: getTypeName(obj),
    };
}

function getTypeName(func) {
    const match = func.toString().match(/(function|class) (\w*)/);
    return match ? match[2] : '';
}
