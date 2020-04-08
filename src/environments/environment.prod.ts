export const environment = {
  production: true,
  baseUrls: {
    local_dev: 'http://172.16.85.61:8080/AppWeb'
  },
  api_endpoints: {
     getUserDetails: '/devops/authentication',
     postUserDetails: '/devops/save',
     submitRepoDetails: '/devops/submit'
   
  }
};