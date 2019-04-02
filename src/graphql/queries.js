// eslint-disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    given_name
    family_name
    email 
    registered
    quote {
      id
      owner
      capacity
      angle
      length
      loading
      material
      extrainfos
      createdAt
      file {
        bucket
        region
        key
      }
      user {
        id
        username
        given_name
        family_name
        email
        registered
      }
    }
  }
}
`;
