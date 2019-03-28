// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
    id
    username
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
        email
        registered
      }
    }
  }
}
`;
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
    id
    username
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
        email
        registered
      }
    }
  }
}
`;
export const onCreateQuote = `subscription OnCreateQuote {
  onCreateQuote {
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
