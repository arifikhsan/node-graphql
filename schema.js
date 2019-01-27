const {
    GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

const customer = [
  { id: "1", name: "John Doe", email: "jdoe@gmail.com", age: 35 },
  { id: "2", name: "John Doe 2", email: "jdoe2@gmail.com", age: 35 },
  { id: "3", name: "John Doe 3", email: "jdoe3@gmail.com", age: 35 }
];

const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        for (let i = 0; i < customer.length; i++) {
          if (customer[i].id == args.id) {
            return customer[i];
          }
        }
      }
    },
    customers: {
        type: new GraphQLList(CustomerType),
        resolve(parentValue, args) {
            return customer;
        }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
