const User = require("../dbModels/user.model");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
	const { username, email, password } = req.body;
	try {
		const existingUser = await User.findOne({
			$or: [{ email }, { username }],
		});
		if (existingUser)
			return res
				.status(400)
				.json({ message: "Username or email already exists" });

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = new User({ username, email, password: hashedPassword });
		await user.save();
		res.status(201).json({ message: "User created successfully" });
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

const login = async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await User.findOne({
			$or: [{ username }, { email: username }],
		});
		if (!user)
			return res.status(400).json({ message: "Invalid credentials" });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(400).json({ message: "Invalid credentials" });

		res.status(200).json({ message: "Login successful" });
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

module.exports = { signup, login };
