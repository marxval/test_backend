import User from "../models/user.js";

export const getUsers = async (req, res) => {
  const [users] = await Promise.all([User.find().select("id username")]);
  res.status(200).json({ results: users });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (id) {
    await User.deleteOne({ _id: id });
    res.status(200).json({ msg: "OK" });
  } else {
    res.status(400).send({ msg: "Bad Request" });
  }
};

export const getUserRecords = async (req, res) => {
  const { id } = req.params;

  if (id) {
    const userRecords = await User.findById(id);
    res.status(200).json({
      results: {
        user: {
          id: userRecords.id,
          username: userRecords.username,
          _id: userRecords._id,
        },
        records: userRecords.records,
      },
    });
  } else {
    res.status(400).send({ msg: "Bad Request" });
  }
};
