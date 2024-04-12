import { password } from "../../database/config/database"

const adminEmail = 'admin@admin.com'
const adminPassword = 'secret_admin'

const userEmail = 'user@user.com'
const userPassword = 'secret_user'

export const invalidEmail = 'dsdsada'
export const invalidPassword = '1'

const adminLogin = {
  email: adminEmail,
  password: adminPassword
}

const userLogin = {
  email: userEmail,
  password: userPassword
}

const invalidLogin = {
  email: invalidEmail,
  password: invalidPassword
}

export {
  adminLogin,
  userLogin,
  invalidLogin
}