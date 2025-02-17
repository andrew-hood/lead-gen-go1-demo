'use server'

export async function getOneTimeToken(formData: FormData): Promise<string> {
  'use server'

  const rawFormData = {
    given_name: formData.get('given_name'),
    family_name: formData.get('family_name'),
    email: formData.get('email'),
    industry: formData.get('industry'),
    region: formData.get('region'),
  }

  const resp = await fetch('http://localhost:3001/api/demo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rawFormData),
  })
  const { one_time_token } = await resp.json()

  return one_time_token
}
