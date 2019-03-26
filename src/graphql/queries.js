// eslint-disable
// this is an auto generated file. This will be overwritten

export const getQuote = `query GetQuote($id: ID!) {
  getQuote(id: $id) {
    id
    capacity
    angle
    length
    loading
    material
    extrainfos
  }
}
`;
export const listQuotes = `query ListQuotes(
  $filter: ModelQuoteFilterInput
  $limit: Int
  $nextToken: String
) {
  listQuotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      capacity
      angle
      length
      loading
      material
      extrainfos
    }
    nextToken
  }
}
`;
