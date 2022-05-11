import db from "../db.js";

let randomPass = "hi";
// setInterval(() => {
//   // let passArray = db.data.messages.map(msg => msg.id);
//   // let randomIndex = Math.floor(Math.random() * passArray.length - 1)
//   // randomPass = String(passArray[randomIndex])
//   randomPass = Math.floor(Math.random() * 150)
//   console.log('randomPass >>', randomPass)
// }, 10 * 60 * 1000)

const checkPassword = (req, res, next) => {
	const password = req.get("Authorization");

	if (password !== randomPass) {
		res.status(401).send({ error: "Invalid password" });
	}
	next();
};

export default checkPassword;
