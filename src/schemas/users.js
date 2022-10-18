const graphql = require("graphql");
const grData = require('graphql-iso-date')
const { GraphQLDateTime } = grData
const { GraphQLObjectType, GraphQLString } = graphql;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const UserType = new GraphQLObjectType({
    name: "User",
    type: "Query",
    fields: {
        id: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        joined: { type: GraphQLDateTime },
        last_logged_in: { type: GraphQLDateTime }
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.UserType = UserType;