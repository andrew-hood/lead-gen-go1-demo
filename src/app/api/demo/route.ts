const AUTH_URL = 'https://auth.qa.go1.cloud'
const API_URL = 'https://gateway.qa.go1.cloud'

const PORTAL_MAPPINGS = {
  au: {
    Accounting: {
      client_id: '6309df038245ca3d37c98e0156554398d5f236cc',
      client_secret: 'a33f611e42043760dd0e9018cebbbe98acff3878',
    },
  },
} as any

export async function POST(req: Request) {
  const { region, industry, ...userData } = await req.json()

  // Get the client credentials for the given region and industry
  const clientCreds = PORTAL_MAPPINGS[region][industry]
  if (!clientCreds) {
    return Response.json(
      { error: 'Invalid region or industry' },
      { status: 400 },
    )
  }

  // Get the access token
  const authResponse = await fetch(`${AUTH_URL}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...clientCreds,
      grant_type: 'client_credentials',
    }),
  })
  const { access_token } = await authResponse.json()

  // Hash the user's email
  const hashEmail = Buffer.from(userData.email).toString('base64')
  const email = hashEmail + '@demo.com'

  // Find the user in the portal
  const userResponse = await fetch(`${API_URL}/user-accounts?email=${email}`, {
    headers: {
      'Content-Type': 'application/json',
      'api-version': 'alpha',
      Authorization: `Bearer ${access_token}`,
    },
  })
  const accounts = await userResponse.json()

  // If the user doesn't exist, create it
  let account
  if (accounts.total === 0) {
    const createUserResponse = await fetch(`${API_URL}/user-accounts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-version': 'alpha',
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        ...userData,
        email: email,
        username: email,
      }),
    })
    account = await createUserResponse.json()
  } else {
    account = accounts.hits[0]
  }

  // TODO - save user data to SalesForce

  // Generate OTT for the user
  const ottResponse = await fetch(
    `${API_URL}/user-accounts/${account.id}/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-version': 'alpha',
        Authorization: `Bearer ${access_token}`,
      },
    },
  )
  const { one_time_token } = await ottResponse.json()

  return Response.json({ one_time_token })
}
