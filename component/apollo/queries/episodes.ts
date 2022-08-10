import { gql } from "@apollo/client";

export const GET_SEARCHEPISODES = (name: string, page: number) => {
  return gql`
      query {
        episodes (
          page:${page}
          filter:{name: "${name}" }) {
            info{
              pages
            }
          results {
            id
            name
            air_date
            episode
            created
          }
        }
      }
    `;
};

export const GET_IDEPISODE = (id: number) => {
  return gql`
    query {
      episode(id:${id} ) {
        id
        name
        air_date
        episode
        created
      }
    }
  `;
};
