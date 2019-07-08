const phase = process.env.NODE_ENV;

export async function getMyGitHubProfile() {
  let result

  if (phase === 'development') {
    result = Promise.resolve({
      login: 'SoYoung210',
      html_url: 'github.com/SoYoung210',
      blog: 'sosolog.netlify.com',
      avartar_url: '',
    })
  } else {
    const response = await fetch('https://api.github.com/users/SoYoung210')
    result = await response.json()
  }

  return result
}
