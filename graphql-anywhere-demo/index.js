import gql from 'graphql-tag';
import graphql, {filter} from 'graphql-anywhere';

// I don't need all this stuff!
const gitHubAPIResponse = {
  "url": "https://api.github.com/repos/octocat/Hello-World/issues/1347",
  "title": "Found a bug",
  "body": "I'm having a problem with this.",
  "user": {
    "login": "octocat",
    "avatar_url": "https://github.com/images/error/octocat_happy.gif",
    "url": "https://api.github.com/users/octocat",
  },
  "labels": [
    {
      "url": "https://api.github.com/repos/octocat/Hello-World/labels/bug",
      "name": "bug",
      "color": "f29513"
    }
  ],
};

const query = gql`
  {
    title
    user {
      login
    }
    labels {
      name
    }
  }
`;

const resolver = (fieldName, root) => root[fieldName];

console.log(filter(query, gitHubAPIResponse));
