import { createUser } from "./users.service"

export const registerController = async (req, res) => {
  try {
    await createUser(req.body)
    res.status(200).send({ message: 'Coucou' })
  } catch (error) {
    console.error(error)
  }
}