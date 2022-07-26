import  {gql}  from "@apollo/client";

export const GET_CHARACTERS = (page:number) => {
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