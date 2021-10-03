import { DocumentDefinition, FilterQuery } from "mongoose"
import jwt from "../helper/jwt"
import User, { UserDocument } from "../model/user"

export const createUser = (data: DocumentDefinition<UserDocument>) => User.create(data)

export const findUser = (query: FilterQuery<UserDocument>) => User.findOne(query).lean()

export const validateCredential = async (username: UserDocument["username"], password: string) => {
  const user = await User.findOne({ username })
  if (!user) return false
  return user.comparePassword(password)
}

export const createRefreshToken = (userId: string) => {

  // Build and return the new access token
  return jwt.encode(
    { user: userId },
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY_TIME } // 1 year
  )
}

export const createAccessToken = (userId: string) => {

  // Build and return the new access token
  return jwt.encode(
    { user: userId },
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY_TIME } // 15 minutes
  )
}

export const createAuthTokens = (userId: string) => {
  const accessToken = createAccessToken(userId) 
  const refreshToken = createRefreshToken(userId) 
  return { accessToken, refreshToken }
}

export const renewAccessToken = async (refreshToken: string) => {

  // Decode the refresh token
  const { user: userId } = jwt.decode(refreshToken) || {}

  if (!userId) return null

  const user = await findUser({ _id: userId })

  if (!user) return null

  return createAccessToken(userId)
}

