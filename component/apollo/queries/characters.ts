import { gql } from "@apollo/client";

export const GET_CHARACTERS = (page: number) => {
  return gql`
    query {
      characters(page:${page}) {
        results {
          id
          name
          species
          image
        }
      }
    }
  `;
};

export const GET_SEARCHCHARACTERS = (name: string,page: number) => {
  return gql`
    query {
      characters (
        page:${page}
        filter:{name: "${name}" }) {
          info{
            pages
          }
        results {
          id
          name
          species
          image
        }
      }
    }
  `;
};
