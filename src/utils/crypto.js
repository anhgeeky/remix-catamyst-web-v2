require('crypto').randomBytes(12, (err, buffer) => {
  const token = buffer.toString('hex')
  console.info(token)
})
