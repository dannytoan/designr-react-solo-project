const express = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../../db/models");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async function (req, res) {
    const collections = await db.Collection.findAll({ include: db.Photo });

    return res.json({ collections });
  })
);

router.get(
  "/:id",
  asyncHandler(async function (req, res) {
    const collection = await db.Collection.findByPk(req.params.id, {
      include: { model: db.User },
    });

    const photos = await db.Photo.findAll({
      where: { collectionId: collection.id },
    });

    return res.json(collection), res.json(photos);
  })
);

router.post(
  "/",
  asyncHandler(async function (req, res) {
    const collection = await db.Collection.create(req.body);

    return res.json(collection);
  })
);

router.delete(
  "/:id",
  asyncHandler(async function (req, res) {
    const deleteCollection = await db.Collection.findByPk(req.params.id);

    if (deleteCollection !== undefined || deleteCollection !== null) {
        await deleteCollection.destroy();
    }

    res.json({
        message: "Collection successfully deleted"
    })
})
);

router.put("/:id", asyncHandler(async function (req, res) {
  const { title } = req.body;
  const updateCollection = await db.Collection.findByPk(req.params.id);

  await updateCollection.update({
    title
  });

  return res.json(
    updateCollection
  )
}));

module.exports = router;
