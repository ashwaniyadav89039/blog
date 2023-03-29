import { db } from "../db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = (req,res)=>{
  
  //check existing user
  const q = "SELECT * FROM users WHERE email = ? OR username = ?"

  db.query(q,[req.body.email,req.body.username],(err,data)=>{
    if(err) {return res.json(err)}
    if(data.length) {return res.status(409).json("user already exist")}

    //hash the passward  and create passward
    
    const salt = bcrypt.genSaltSync(5);
    
    const hash = bcrypt.hashSync(req.body.password, salt);

    console.log("+++",hash.length);

    const q= "INSERT INTO users(`username`,`email`,`password`) VALUES (?)" 
    


    const values =[
        req.body.username,
        req.body.email,
        hash,
    ]

    console.log("Values being inserted:", values);
    

    db.query(q,[values],(err,data)=>{
        if(err) {return res.status(500).json(err)}

        console.log("Data inserted:", data)

        return res.status(200).json("user has been created")

        
         

    })
  })

}

export const login = (req,res)=>{
 console.log("++++++",req.body.password,req.body.username);
  //check user 

  const q = "SELECT * FROM users WHERE username= ?"

  db.query(q,[req.body.username],(err,data)=>{
    if(err){return res.status(500).json(err)};
    if(data.length ===0){return res.status(404).json("data not found")} 

    //check passward

    const isPassswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    
    console.log("isPassswardCorrect",isPassswordCorrect);
    
    if(!isPassswordCorrect) {
      console.log("condition checking", isPassswordCorrect)
      return res.status(400).json("wrong user or password");
    }
    

       const token = jwt.sign({id:data[0].id},"jwtkey")
       const {password,...other} = data[0]

      res.cookie("access_token",token,{
        httpOnly:true   
      }).status(200).json(other)
  });
    
};

export const logout = (req,res)=>{

  res.clearCookie("access_token",{
    sameSite:"none",
    secure:true
  }).status(200).json("user has been logout")
    
}