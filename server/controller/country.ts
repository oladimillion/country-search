import { Request, Response } from "express"
import axios from "axios"
import { get } from "lodash"
import log from "../helper/logger"

const search = async (req: Request, res: Response) => {
  const API_KEY = process.env.COUNTRY_SEARCH_API_KEY
  const URL = process.env.COUNTRY_SEARCH_URI
  const { country_name } = req.body
  const PATH = `${URL}/${country_name}?access_key=${API_KEY}&FullText=true`

  try {
    const { data } = await axios.get(PATH)
    if (get(data, "error")) {
      return res.status(400).json({ message: `Couldn't find '${country_name}' country` })
    } else {
      return res.status(200).json(data)
    }
  } catch(e) {
    log.error(e as any)
    return res.status(400).json({ message: `Couldn't find '${country_name}' country` })
  }
}

export default { search }
