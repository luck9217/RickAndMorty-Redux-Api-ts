import { gql } from "@apollo/client";

export const GET_SEARCHLOCATIONS = (name: string, page: number) => {
  return gql`
      query {
        locations (
          page:${page}
          filter:{name: "${name}" }) {
            info{
              pages
            }
          results {
            id
            name
            created
            dimension
            type
          }
        }
      }
    `;
};

export const GET_IDLOCATIONS = (id: number) => {
  return gql`
    query {
        location(id:${id} ) {
            id
            name
            type
            dimension
            created
      }
    }
  `;
};
