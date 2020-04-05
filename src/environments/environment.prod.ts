export const environment = {
  production: true,
  baseUrls: {
    local_dev: 'http://localhost:12001'
  },
  api_endpoints: {
     getUserDetails: '/devops/authentication',
     postUserDetails: '/devops/save',
     submitRepoDetails: '/devops/submit'
   
  }
};