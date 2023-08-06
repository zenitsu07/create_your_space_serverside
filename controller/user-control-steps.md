For token used, JWT to create access tokens and refressh token
here aaccess token always gets invalidated after timeout but refresh tokens are there always 
So we store refresh token->
S-1 - Create token.js to create token schems to store token 
token schema is created and mongoose.model('collection name', schemaname) is used to store that model schema in token variable;
Import to accches this schema and newToken.save()

generate token with "require('crypto).randomBytes(64).toString('hex)

To create such tokens On command line
-> node
-> require('crypto').randomBytes(64).toString('hex')
