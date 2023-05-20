type SchemaDefinitionProperty = import('mongoose').Schema

type Schema = {
    name: string
    fields: SchemaDefinitionProperty
}

type Field = import('mongoose').SchemaDefinition