const corsHeaders = {
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Origin': '*' // TODO??
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  if (request.method === 'OPTIONS') {
    return new Response('OK', { headers: corsHeaders })
  } else if (request.method === 'GET') {
    const { searchParams } = new URL(request.url)
    const name = searchParams.get('name')
    const endpointURL = `https://api.twitter.com/2/users/by/username/${name}?user.fields=public_metrics`
    const response =  await fetch(endpointURL) // TODO?? bearer content-type
    const json = await response.json()
    const res = JSON.stringify(json)
    return new Response(res, {
      headers: {
        'Content-type': 'application/json',
        ...corsHeaders
      }
    })
  } else {
    return new Response('Invalid method', { status: 500 });
  }
}
