import { gql } from '@apollo/client';

// export const QUERY_TRIPS = gql`
//   query trips {
//     trips {
//       _id
//       creator {
//         firstname
//       }
//       title
//       description
//       departureLocation
//       destination
//       startDate
//       endDate
//       tripType {
//         tripType
//       }
//       meetupPoint
//       approvedTrip
//       published
//       image
//       travelmates {
//         firstname
//         email
//       }
//     }
//   }
// `;

export const QUERY_MY_TRIPS = gql`
  query  myTrips($travelmates: ID!) {
    myTrips(travelmates: $travelmates) {
      _id
      title
      departureLocation
      description
      destination
      image
      startDate
      endDate
      travelmates {
        _id
        email
        firstname
      }
    }
  }
`;


export const QUERY_USERS = gql`
  query users {
    users {
      _id
      firstname
      lastname
      email
      isAdmin
    }
  }
`;

export const QUERY_USER = gql`
  query user($userId: ID!) {
    user(id: $userId) {
      _id
      firstname
      lastname
      email
      isAdmin
    }
  }
`;

export const QUERY_PROFILE = gql`
query profile($profileUser: ID!) {
  profile(id: $profileUser) {
    _id
    profileUser {
      _id
      firstname
      lastname
      email
    }
    location
    joinedDate
    gender
    age
    bio
    interests {
      _id
      label
    }
    image
    verified
    subscribed
    createdTrips {
      title
    }
    tripCount
  }
}
`;
export const QUERY_PROFILES = gql`
  query profiles {
    profiles {
      _id
      age
      bio
      createdTrips {
        title
        travelmates {
          firstname
        }
        _id
        image
        departureLocation
        description
        destination
      }
      gender
      image
      interests {
        label
      }
      joinedDate
      location
      profileUser {
        firstname
        _id
      }
      subscribed
      tripCount
      verified
    }
  }
`;

export const SEARCH_TRIPS = gql`
query SearchTrips($departureLocation: String) {
  searchTrips(departureLocation: $departureLocation) {
    _id
    creator {
      _id
      firstname
      lastname
      email
      password
      isAdmin
    }
    title
    description
    departureLocation
    destination
    startDate
    endDate
    tripType {
      _id
      tripType
    }
    meetupPoint
    approvedTrip
    published
    image
    travelmates {
      _id
      firstname
      lastname
      email
      password
      isAdmin
    }
  }
}
`;

export const PROFILE_EXISTS = gql`
query ProfileExist($profileUser: ID!) {
  profileExist(profileUser: $profileUser) {
    profileUser {
      _id
    }
  }
}
`;

export const QUERY_INTEREST = gql`
query Interests {
  interests {
    _id
    label
  }
}
`;