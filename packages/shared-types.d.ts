type SchemaDefinitionProperty = import('mongoose').Schema

type Schema = {
    name: string
    props: SchemaDefinitionProperty
}

type Field = import('mongoose').SchemaDefinition