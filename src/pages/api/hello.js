// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Amplify, { withSSRContext } from "aws-amplify"
import config from "../../aws-exports.js";

// Amplify SSR configuration needs to be done within each API route
Amplify.configure({ ...config, ssr: true });

export default (req, res) => {
  res.status(200).json({ name: 'John Doe' })
}
