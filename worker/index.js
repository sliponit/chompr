const corsHeaders = {
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'GET,POST',
  'Access-Control-Allow-Origin': 'https://chompr.io'
}

async function fetchTwitterProfile(name){
  const endpointURL = `https://api.twitter.com/2/users/by/username/${name}?user.fields=public_metrics`
  const response =  await fetch(endpointURL,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TWITTER_TOKEN_BEARER}`
    }
  })
  return await response.json()
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === 'OPTIONS') {
    return new Response('OK', { headers: corsHeaders })
  } else if (request.method === 'GET') {
    const { searchParams } = new URL(request.url)
    const name = searchParams.get('name')
    const profile = await fetchTwitterProfile(name)
    const res = JSON.stringify(profile)
    return new Response(res, {
      headers: {
        'Content-type': 'application/json',
        ...corsHeaders
      }
    })
  } else if (request.method === 'POST') { // TODO?? check headers
    // curl -X POST <worker> -H "Content-Type: application/json" -d '{"events": "def"}'
    const { twitter_name, count } = await request.json() || {}
    if (!twitter_name || !count ) {
      return new Response('Forbidden', { status: 403 })
    }

    const key = twitter_name.toLowerCase()
    const profile = await fetchTwitterProfile(key)
    const newCount = profile?.data?.public_metrics?.tweet_count || 0
    if (newCount >= count) {
      return new Response('BadRequest', { status: 400 })
    }

    const user = await CHOMPERS.get(key, { type: 'json' })
    const quest = {
      number: 1,
      old_count: count,
      profile: profile.data,
      date: new Date().toISOString()
    }
    const quests = (user?.quests || []).concat(quest)
    await CHOMPERS.put(key, JSON.stringify({ twitter_name: key, quests }))
    return new Response(JSON.stringify(profile), {
      headers: {
        'Content-type': 'application/json',
        ...corsHeaders
      }
    })
  } else {
    return new Response('InvalidMethod', { status: 500 });
  }
}
