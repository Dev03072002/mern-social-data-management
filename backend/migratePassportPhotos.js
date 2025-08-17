require("dotenv").config();
const mongoose = require("mongoose");
const { cloudinary } = require("./config/cloudinary");
const User = require("./models/User");

function detectMimeType(base64String) {
  const buffer = Buffer.from(base64String, "base64");

  // JPEG magic number: FF D8
  if (buffer[0] === 0xff && buffer[1] === 0xd8) return "image/jpeg";
  // PNG magic number: 89 50
  if (buffer[0] === 0x89 && buffer[1] === 0x50) return "image/png";

  // Default fallback
  return "image/jpeg";
}

(async () => {
  try {
    // 1. Connect to Mongo
    await mongoose.connect(process.env.MONGO_URI, { autoSelectFamily: false });
    console.log("✅ Connected to MongoDB");

    // 2. Find users with passportPhoto
    const users = await User.find({
      passportPhoto: { $exists: true, $ne: null },
    });

    console.log(`Found ${users.length} users to check...`);

    for (const user of users) {
      const photo = user.passportPhoto;

      // skip if already a URL
      if (typeof photo === "string" && photo.startsWith("http")) {
        console.log(`➡️ Skipping ${user._id} (already URL)`);
        continue;
      }

      // skip if invalid/too short
      if (!photo || photo.length < 50) {
        console.log(`➡️ Skipping ${user._id} (invalid photo)`);
        continue;
      }

      console.log(`⬆️ Uploading photo for ${user._id}...`);

      // 3. Detect type & prepend prefix
      const mimeType = detectMimeType(photo);
      const formattedPhoto = `data:${mimeType};base64,${photo}`;

      // 4. Upload to Cloudinary
      const uploadRes = await cloudinary.uploader.upload(formattedPhoto, {
        folder: "passport_photos",
      });

      // 5. Save Cloudinary URL back
      user.passportPhoto = uploadRes.secure_url;
      await user.save();

      console.log(`✅ Updated ${user._id}`);
    }

    console.log("🎉 Migration complete");
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration error:", err);
    process.exit(1);
  }
})();
