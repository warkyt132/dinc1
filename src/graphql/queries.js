const { GraphQLObjectType} = require("graphql");

let graphqlObject = { name: "RootQueryType", type: "Query", fields: {} };

graphqlObject.fields.users = require("../resolvers/users").users

exports.query = new GraphQLObjectType(graphqlObject);
