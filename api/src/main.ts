import { NextApiRequest, NextApiResponse } from "next";

export const main = (req: NextApiRequest, res: NextApiResponse) => {
	return res.status(200).json({
		message: "Test"
	});
}
