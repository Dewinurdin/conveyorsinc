// eslint-disable
// this is an auto generated file. This will be overwritten

export const registerUser = `mutation RegisterUser($input: CreateUserInput!) {
  registerUser(input: $input) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
export const createQuote = `mutation CreateQuote($input: CreateQuoteInput!) {
  createQuote(input: $input) {
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
      }
    }
  }
}
`;
