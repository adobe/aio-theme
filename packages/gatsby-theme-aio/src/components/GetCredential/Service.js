export const getOrganizations = async () => {
  try {

    const token = window.adobeIMS?.getTokenFromStorage()?.token;

    if (token) {
      const response = await fetch("/console/api/accounts?includeOrganizations=true", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
          "x-api-key": window?.adobeIMS?.adobeIdData?.client_id
        }
      });

      if (!response.ok) {
        throw new Error('Could not fetch accounts');
      }

      const accountsResult = await response.json();

      const organizations = []
      accountsResult.accounts.forEach(account => {
        if (account.organizations?.length > 0) {
          account.organizations.forEach(org => {
            organizations.push({
              ...org,
              accountId: account.id,
              accountType: account.type
            })
          });
        }
      });

      organizations.sort((a, b) => a.name.localeCompare(b.name));

      return organizations;
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

export const getCredentialSecrets = async (response, selectedOrganization) => {

  let projectId = response?.workspaces ? response?.workspaces[0]?.credentials[0]?.id : response?.id
  const secretsUrl = `/console/api/organizations/${selectedOrganization.code}/integrations/${projectId}/secrets`;
  const token = window.adobeIMS?.getTokenFromStorage()?.token;
  const secretsResponse = await fetch(secretsUrl, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'x-api-key': window.adobeIMS?.adobeIdData?.client_id,
    },
  });

  const secrets = await secretsResponse.json();

  const secret = secrets.client_secrets[0]?.client_secret;

  return { clientId: secrets?.client_id, clientSecret: secret }

};

export const generateToken = async (apikey, secret, scopesDetails) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: apikey,
      client_secret: secret,
      grant_type: 'client_credentials',
      scope: scopesDetails?.scope,
    }),
  };

  const tokenResponse = await fetch('/ims/token/v3', options);
  const tokenJson = await tokenResponse.json();

  return (tokenJson.access_token)

}