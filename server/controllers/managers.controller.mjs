import { Manager } from "../models/managers.model.mjs";

export const getManagers = async (
  req,
  res
) => {
  try {
    const managers = await Manager.find(
      {}
    ).lean();
    const transformedManagers =
      managers.map(
        ({ _id, __v, ...rest }) => ({
          id: _id.toString(),
          ...rest,
        })
      );
    res
      .status(200)
      .json(transformedManagers);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message });
  }
};

export const getManager = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    const manager =
      await Manager.findById(id);
    res.status(200).json(manager);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message });
  }
};

export const createManager = async (
  req,
  res
) => {
  try {
    const manager =
      await Manager.create({
        ...req.body,
        registrationDate: new Date(),
      });
    res.status(200).json(manager);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message });
  }
};

export const updateManager = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const manager =
      await Manager.findByIdAndUpdate(
        id,
        req.body
      );

    if (!manager) {
      return res.status(404).json({
        message: "Manager not found",
      });
    }

    const updatedManager =
      await Manager.findById(id);
    res
      .status(200)
      .json(updatedManager);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message });
  }
};

export const deleteManager = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const manager =
      await Manager.findByIdAndDelete(
        id
      );

    if (!manager) {
      return res.status(404).json({
        message: "Manager not found",
      });
    }

    res.status(200).json({
      message:
        "Manager deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message });
  }
};
