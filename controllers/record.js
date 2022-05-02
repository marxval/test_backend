import User from "../models/user.js";

export const updateRecord = async (req, res) => {
  const { user_id, record_id } = req.params;
  const { punchIn, punchOut, date } = req.body;

  const punchInFullDate = new Date(`${date} ${punchIn}`);
  const punchOutFullDate = new Date(`${date} ${punchOut}`);

  if (user_id && record_id && punchInFullDate && punchOutFullDate) {
    await User.updateOne(
      {
        _id: user_id,
        "records._id": record_id,
      },
      {
        $set: {
          "records.$.punchIn": punchInFullDate,
          "records.$.punchOut": punchOutFullDate,
        },
      }
    );
    res.status(200).json({ msg: "OK" });
  } else {
    res.status(400).send({ msg: "Bad Request" });
  }
};

export const deleteRecord = async (req, res) => {
  const { user_id, record_id } = req.params;

  if (user_id && record_id) {
    try {
      await User.updateOne(
        {
          _id: user_id,
        },
        {
          $pull: {
            records: {
              _id: record_id,
            },
          },
        }
      );
      res.status(200).json({ msg: "OK" });
    } catch (error) {
      res.status(500).send({ msg: "Server Error" });
    }
  } else {
    res.status(400).send({ msg: "Bad Request" });
  }
};
