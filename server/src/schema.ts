export const typeDefs = `#graphql
type User {
    id: ID
    name: String!
    email: String!
    password: String!
    isadmin: Boolean!
} 

type Banner {
    _id: ID
    name: String!
    productID: String!
    categoryName: String!
    clickCount: Int!
    image: Image!
    size: BannerSize!
    kind: [BannerKind!]!
    text: String!
    author: String!
    }
    
type Image {
    url: String!
    alt: String!
}
 
enum BannerSize {
    side
    top
    all
    }

 enum BannerKind {
    price
    sale
}

type Query {
    banners: [Banner!]!
    bannersByCategory(category: String!): [Banner!]!
    bannersByProduct(product: String!): [Banner!]!
    bannerByID(id: ID!): Banner!
    users: [User!]!
    userByID(id: ID!): User!
    userByEmail(email: String!): User!
}

input UsersInput {
    id: ID
    name: String!
    email: String!
    password: String!
    isadmin: Boolean!
} 




type Mutation {
    registerUser(id: ID, name: String!, email: String!, password: String!, isadmin: Boolean!): User
    updateUser(user: UsersInput): User
    deleteUser(user: UsersInput): User
}
`;
