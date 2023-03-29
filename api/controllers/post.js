import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const q =
    "SELECT `p`.`id`, `u`.`username`, `p`.`title`, `p`.`descript`, `p`.`image`, `u`.`image` AS `userImage`, `p`.`cat`, `p`.`dates` FROM `users` `u` JOIN `posts` `p` ON `u`.`id` = `p`.`uid` WHERE `p`.`id` = ?"
    

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {

  console.log("///",req.body);
  
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  console.log("@@@",token);

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    let uid = userInfo.id;

    const q =
    `INSERT INTO blog.posts(title,descript,image,cat,dates,uid) VALUES ('${req.body.desc}','${req.body.title}','${req.body.img}','${req.body.cat}','${req.body.date}',${uid})`


    // const values = [
    //   req.body.title,
    //   req.body.descript,
    //   req.body.image,
    //   req.body.cat,
    //   req.body.dates,
    //   userInfo.id,
    // ];
    
console.log("query is : ",q)
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err.message);
      return res.json("Post has been created.");
    });
    
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  console.log("token of the update ++",token);

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q =
      `UPDATE blog.posts SET title='${req.body.desc}', descript='${req.body.title}', image='${req.body.img}', cat='${req.body.cat}' WHERE id='${postId}' AND uid='${userInfo.id}'`

      console.log("query is ???: ",q)

    // const values = [, req.body.desc, req.body.img, req.body.cat];

    db.query(q,  (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  });
};
