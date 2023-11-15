import { createUser } from "./users.service"

export const registerController = async (req, res) => {
  try {
    const newUser = await createUser(req.body)
    res.status(201).send({ newUser })
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
  }
}