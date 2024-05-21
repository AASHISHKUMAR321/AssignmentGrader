const solution = `
File: package.json
{
  "name": "c2",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "bcrypt": "^5.1.1",
    "dotenv": "^16.4.5",
    "express": "^4.18.3",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.2.1",
    "multer": "^1.4.5-lts.1"
  },
  "devDependencies": {
    "eslint": "^8.57.0"
  }
}


Folder: src
  Folder: config
    File: db.js
const { connect } = require("mongoose");

const connectToDb = async (url) => {
  await connect(url);
};

module.exports = connectToDb;


  Folder: middlewares
    File: auth.js
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) {
      return res.status(401).json("unautorized :no token is provided");
    }
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) return  res.status(401).json({ error: "unautorized:Invalid token" });
      req.user = decoded;
      next();
    });
  } catch (err) {
    console.log("error verify token", err);
    return res.status(500).json({ error: "Invalid token" });
  }
};

module.exports = authenticate;


    File: role.js
const role = (role) => {
  return (req, res, next) => {
    if (role.includes(req.user.role)) {
      next();
    } else {
      return res
        .status(401)
        .send({ message: "your are authorized to access this route" });
    }
  };
};

module.exports = role;


    File: upload.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads/'); // Specify the directory where uploaded files should be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext); // Define the filename for uploaded files
  },
});

const fileFilter = function (req, file, cb) {
  // Accept only PDF, JPEG, and PNG files
  if (file.mimetype === 'application/pdf' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, JPEG, and PNG files are allowed!'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;

  Folder: models
    File: claim.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const claimSchema = new Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  claimFile: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  employeeId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the employee who submitted the claim
  managerId: { type: Schema.Types.ObjectId, ref: 'User' ,required:true}, // Reference to the manager assigned to review the claim
  // Add other fields as needed
});

module.exports = mongoose.model('claims', claimSchema);

    File: departmentModel.js
const { Schema, model } = require("mongoose");

const departmentSchema = new Schema({
  name: { type: String, required: true, unique: true },
  manager: { type: Schema.Types.ObjectId, required: true, ref: "users" },
});

const departmentModel = model("departments", departmentSchema);

module.exports = departmentModel;


    File: user.model.js
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["Employee", "Manager", "Finance"],
    default: "Employee",
  },
  dipartment: { type: String, required: true },
  manager: { type: Schema.Types.ObjectId, ref: "users" },
});

const userModel = model("users", userSchema);

module.exports = userModel;



  Folder: routes
    File: DepartmentRoute.js
const expres = require("express");


const departmentModel = require("../models/departmentModel");


const departmentRouter = expres.Router();

departmentRouter.get("/", async (req, res) => {
  try {
    const alldepartments = await departmentModel.find().populate('manager')
    return res.status(200).json(alldepartments);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

departmentRouter.post("/", async (req, res) => {
  try {
    const department = await departmentModel.findOne({
      name: req.body.departmentName,
    });

    if (department) {
      return res.status(401).send("department already exists");
    }
    const newdepartment = new departmentModel(req.body);
    await newdepartment.save();
    res.status(201).json({ mess: "successfully created the department" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// departmentRouter.post("/:id/review", async (req, res) => {
//   try {
//     const review = new reviewModel({
//       ...req.body,
//       user: req.user._id,
//       book: req.params.id,
//     });
//     await review.save();
//     res.status(201).json({ mess: "successfully created the review" });
//   } catch (err) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
// departmentRouter.get("/review", async (req, res) => {
//   try {
//     const reviews = await reviewModel.find();
//     res.status(201).json({ review: reviews });
//   } catch (err) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
// departmentRouter.patch("/review/:id", async (req, res) => {
//   try {
//     const review = await reviewModel.findById(req.params.id);
//     if (req.user._id == review.user) {
//       await reviewModel.findByIdAndUpdate(req.params.id, req.body);
//       return res.status(201).json({ message: "review updated successfully" });
//     } else {
//       return res
//         .status(400)
//         .json({ message: "your are not authorized to updated the review" });
//     }
//   } catch (err) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// departmentRouter.delete("/review/:id", async (req, res) => {
//   try {
//     const review = await reviewModel.findById(req.params.id);
//     if (req.user._id == review.user) {
//       await reviewModel.findByIdAndDelete(req.params.id);
//       return res.status(201).json({ message: "review deletd successfully" });
//     } else {
//       return res
//         .status(400)
//         .json({ message: "your are not authorized to delete the review" });
//     }
//   } catch (err) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// departmentRouter.patch("/:id", async (req, res) => {
//   try {
//     const book = await departmentModel.findById(req.params.id);
//     if (book.user == req.user._id) {
//       await departmentModel.findByIdAndUpdate(req.params.id, req.body);
//       return res.status(200).json("your songs updated successfully");
//     } else {
//       return res
//         .status(401)
//         .json({ message: "you are not authorize to update this book" });
//     }
//   } catch (err) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
// departmentRouter.delete("/:id", async (req, res) => {
//   try {
//     const book = await departmentModel.findById(req.params.id);
//     if (book.user == req.user._id) {
//       await departmentModel.findByIdAndDelete(req.params.id);
//       return res.status(200).json("your book delted successfully");
//     } else {
//       return res
//         .status(401)
//         .json({ message: "you are not authorize to delete this book" });
//     }
//   } catch (err) {
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });

module.exports = departmentRouter;


    File: bookRoute.js
const expres = require("express");
const bookModel = require("../models/book.model");
const reviewModel = require("../models/reviews.model");
const userModel = require("../models/user.model");

const bookRouter = expres.Router();

bookRouter.get("/", async (req, res) => {
  console.log("this is get  request for books");
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const query = req.query.q;

    // Define conditions for search
    let conditions = {};

    // Add search query conditions for title or author
    if (query) {
      conditions.$or = [
        { title: { $eq: query } },
        { author: { $eq: query } },
        { status: { $eq: query } },
      ];
    }
    // Calculate skip value
    const skip = (page - 1) * limit;
    // page -1 1-1=0*10
    //page -2  2-1 =1*10 = 10;

    const allbooks = await bookModel.find(conditions).skip(skip).limit(limit);
    return res.status(200).json(allbooks);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

bookRouter.post("/", async (req, res) => {
  console.log(req.user);
  try {
    const user = await userModel.findOne({ email: req.user.email });

    const song = new bookModel({ ...req.body, user: user._id });
    await song.save();
    res.status(201).json({ mess: "successfully created the book" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

bookRouter.post("/:id/review", async (req, res) => {
  try {
    const review = new reviewModel({
      ...req.body,
      user: req.user._id,
      book: req.params.id,
    });
    await review.save();
    res.status(201).json({ mess: "successfully created the review" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});
bookRouter.get("/review", async (req, res) => {
  try {
    const reviews = await reviewModel.find();
    res.status(201).json({ review: reviews });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});
bookRouter.patch("/review/:id", async (req, res) => {
  try {
    const review = await reviewModel.findById(req.params.id);
    if (req.user._id == review.user) {
      await reviewModel.findByIdAndUpdate(req.params.id, req.body);
      return res.status(201).json({ message: "review updated successfully" });
    } else {
      return res
        .status(400)
        .json({ message: "your are not authorized to updated the review" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

bookRouter.delete("/review/:id", async (req, res) => {
  try {
    const review = await reviewModel.findById(req.params.id);
    if (req.user._id == review.user) {
      await reviewModel.findByIdAndDelete(req.params.id);
      return res.status(201).json({ message: "review deletd successfully" });
    } else {
      return res
        .status(400)
        .json({ message: "your are not authorized to delete the review" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

bookRouter.patch("/:id", async (req, res) => {
  try {
    const book = await bookModel.findById(req.params.id);
    if (book.user == req.user._id) {
      await bookModel.findByIdAndUpdate(req.params.id, req.body);
      return res.status(200).json("your songs updated successfully");
    } else {
      return res
        .status(401)
        .json({ message: "you are not authorize to update this book" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});
bookRouter.delete("/:id", async (req, res) => {
  try {
    const book = await bookModel.findById(req.params.id);
    if (book.user == req.user._id) {
      await bookModel.findByIdAndDelete(req.params.id);
      return res.status(200).json("your book delted successfully");
    } else {
      return res
        .status(401)
        .json({ message: "you are not authorize to delete this book" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = bookRouter;


    File: cliamRouter.js
const expres = require("express");

const claimModel = require("../models/claim");
const upload = require("../middlewares/upload");
const userModel = require("../models/user.model");

const claimRouter = expres.Router();

claimRouter.get("/", async (req, res) => {
  try {
    const allclaims = await claimModel.find({ employeeId: req.user._id });
    return res.status(200).json(allclaims);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

claimRouter.post("/", upload.single("claimFile"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }
    const { description, amount } = req.body;
    const user = await userModel.findOne({ email: req.user.email });

    const claim = new claimModel({
      description,
      amount,
      claimFile: req.file?.path,
      employeeId: user._id,
      managerId: user.manager,
    });

    await claim.save();
    res.status(201).json({ mess: "successfully submitted the claim" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// claimRouter.post("/:id/review", async (req, res) => {
//   try {
//     const review = new reviewModel({
//       ...req.body,
//       user: req.user._id,
//       book: req.params.id,
//     });
//     await review.save();
//     res.status(201).json({ mess: "successfully created the review" });
//   } catch (err) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
// claimRouter.get("/review", async (req, res) => {
//   try {
//     const reviews = await reviewModel.find();
//     res.status(201).json({ review: reviews });
//   } catch (err) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
// claimRouter.patch("/review/:id", async (req, res) => {
//   try {
//     const review = await reviewModel.findById(req.params.id);
//     if (req.user._id == review.user) {
//       await reviewModel.findByIdAndUpdate(req.params.id, req.body);
//       return res.status(201).json({ message: "review updated successfully" });
//     } else {
//       return res
//         .status(400)
//         .json({ message: "your are not authorized to updated the review" });
//     }
//   } catch (err) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// claimRouter.delete("/review/:id", async (req, res) => {
//   try {
//     const review = await reviewModel.findById(req.params.id);
//     if (req.user._id == review.user) {
//       await reviewModel.findByIdAndDelete(req.params.id);
//       return res.status(201).json({ message: "review deletd successfully" });
//     } else {
//       return res
//         .status(400)
//         .json({ message: "your are not authorized to delete the review" });
//     }
//   } catch (err) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// claimRouter.patch("/:id", async (req, res) => {
//   try {
//     const book = await bookModel.findById(req.params.id);
//     if (book.user == req.user._id) {
//       await bookModel.findByIdAndUpdate(req.params.id, req.body);
//       return res.status(200).json("your songs updated successfully");
//     } else {
//       return res
//         .status(401)
//         .json({ message: "you are not authorize to update this book" });
//     }
//   } catch (err) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
// claimRouter.delete("/:id", async (req, res) => {
//   try {
//     const book = await bookModel.findById(req.params.id);
//     if (book.user == req.user._id) {
//       await bookModel.findByIdAndDelete(req.params.id);
//       return res.status(200).json("your book delted successfully");
//     } else {
//       return res
//         .status(401)
//         .json({ message: "you are not authorize to delete this book" });
//     }
//   } catch (err) {
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });

module.exports = claimRouter;


    File: userRoute.js
const express = require("express");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userModel = require("../models/user.model");
const departmentModel = require("../models/departmentModel");
const authenticate = require("../middlewares/auth");
const role = require("../middlewares/role");
require("dotenv").config();
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  try {
    const { name, email, pass, dipartment, role } = req.body;
    const user = await userModel.find({ email: email });

    if (user.length > 0) {
      return res.status(401).json({ message: "user is already registered" });
    }

    const hashPassword = bcrypt.hashSync(pass, 10);

    const newUser = new userModel({ name, email, pass, dipartment, role });
    newUser.password = hashPassword;
    console.log(newUser);

    await newUser.save();

    res.status(201).json({ message: "user registered successfully", user });
  } catch (err) {
    console.log("we got the error while registering the user", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id)
    console.log(user)
    res.send(user);
  } catch (err) {
    console.log(err);
  }
});

userRouter.get("/", async (req, res) => {
  try {
    const user = await userModel.find()
    res.send(user);
  } catch (err) {
    console.log(err);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, pass } = req.body;
    const user = await userModel.findOne({ email: email });
    console.log(user);
    if (!user || !bcrypt.compare(pass, user.password)) {
      return res.status(401).json({ message: "wrong credentials" });
    }

    const access_token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      // eslint-disable-next-line no-undef
      process.env.SECRET_KEY
      // { expiresIn: "5m" }
    );
    const refresh_token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      // eslint-disable-next-line no-undef
      process.env.SECRET_KEY,
      { expiresIn: "5m" }
    );
    console.log(user);
    res.json({
      message: "login sucessfully",
      refresh_token: refresh_token,
      access_token: access_token,
    });
  } catch (err) {
    console.log("we got the error while login the user", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.patch(
  "/:id/assign-manager",
  authenticate,
  role(["Finance"]),
  async (req, res) => {
    try {
      const user = await userModel.findOne({ email: req.user.email });
      console.log(user);
      if (!user) {
        return res.status(401).json({ message: "user is not  registered" });
      }

      const department = await departmentModel.findOne({
        name: user.dipartment,
      });
      console.log(department);

      const newUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          manager: department.manager,
        },
        { new: true }
      );

      await newUser.save();

      res.status(201).json({ message: "manager assigned successfully", user });
    } catch (err) {
      console.log("we got the error while assigning  the manager", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = userRouter;


  File: server.js
const express = require("express");
const connectToDb = require("./config/db");
const userHandler = require("./routes/userRoute");

// const authenticate = require("./middlewares/auth");

// // const departmentRouter = require("./routes/DepartmentRoute");
// const claimRouter = require("./routes/cliamRouter");
const app = express();
require("dotenv").config();
app.use(express.json());

// app.use("/claims", authenticate, claimRouter);
app.use("/users", userHandler);
// app.use("/departments", departmentRouter);
// eslint-disable-next-line no-undef


const port = process.env.PORT || 9090;
app.get("/", (req, res) => {
  res.send("this is a home route");
});
app.listen(port, async () => {
  // eslint-disable-next-line no-undef
  await connectToDb(process.env.DB_URI);
  console.log("connected to DB");
  console.log("server is running on port " + port);
});





`;

export default solution;
