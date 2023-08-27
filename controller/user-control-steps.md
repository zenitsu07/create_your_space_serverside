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

A JSON Web Token or JWT is made up of three parts:

JWT logic

The header: contains some metadata about the token itself.
The payload: contains the data that we want to encode into the token, so the more data we want to encode here the bigger is the JWT.
The signature.
These first two parts, the header and the payload, are just plain text that will get encoded, but not encrypted.

So anyone will be able to decode them and read them, we cannot store any sensitive data in here. But that's not a problem at all because in the third part, the signature, is where things really get interesting. The signature is created using the header, the payload, and the secret that is saved on the server.

And this whole process is then called signing the Json Web Token. The signing algorithm takes the header, the payload, and the secret to create a unique signature. So only this data plus the secret can create this signature. Then together with the header and the payload, these signature forms the JWT, which then gets sent to the client. 
Once the server receives a JWT to grant access to a protected route, it needs to verify it in order to determine if the user really is who he claims to be. In other words, it will verify if no one changed the header and the payload data of the token. So again, this verification step will check if no third party actually altered either the header or the payload of the Json Web Token.