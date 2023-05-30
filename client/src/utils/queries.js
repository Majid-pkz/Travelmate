import { gql } from '@apollo/client';

export const QUERY_TRIP = gql`
  query trips {
    trips {
      _id
      destination
      description
      title
      creator {
        _id
        username
      }
      
    }
  }
`;


